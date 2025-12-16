import os
import json
import re
import google.generativeai as genai
from github import Github, Auth

# --- Configuration ---
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
REPO = os.getenv('REPO_NAME')
PR_NUM = int(os.getenv('PR_NUMBER'))

# --- Gemini Setup ---
genai.configure(api_key=GEMINI_API_KEY)
# Using the updated model to avoid 404 errors
model = genai.GenerativeModel('gemini-2.5-flash')

# --- GitHub Connection ---
auth = Auth.Token(GITHUB_TOKEN)
g = Github(auth=auth)
repo = g.get_repo(REPO)
pr = repo.get_pull(PR_NUM)

# Get the latest commit to attach comments correctly
last_commit = list(pr.get_commits())[-1]

# --- Fetching Data (Diff) ---
print("Fetching diff...")
diff_data = ""
files_to_check = []
for file in pr.get_files():
    if file.status in ["removed", "renamed", "deleted"]:
        continue
    # Add only changed files to context
    diff_data += f"\n--- FILE: {file.filename} ---\n{file.patch}\n"
files_to_check.append(file.filename)

if not diff_data.strip():
    print("No changes to review.")
    exit(0)

# Truncate if too large to protect limits
if len(diff_data) > 40000:
    diff_data = diff_data[:40000] + "\n...(truncated)..."

# --- Prompt for JSON Response ---
prompt = f"""
You are a strict Code Reviewer. Your task is to find errors, bugs, vulnerabilities, and style issues.
Analyze the provided git diffs.

IMPORTANT:
1. Your response MUST be strictly in JSON format.
2. Do not write any introductory text, only the JSON array.
3. Comment ONLY on changed lines (those starting with '+').
4. If a line is just moved or context (starts with a space), do not comment on it.
5. JSON Format:
[
  {{
    "path": "filename",
    "line": line_number_in_new_file,
    "body": "Review comment in English (Markdown supported)"
  }}
]

Attention to line numbers:
In git diff, the header looks like @@ -old_line,count +new_line,count @@.
You must calculate the correct line number in the *new* file (new_line) based on the diff.
Here are the changes:
{diff_data}
"""

# --- Request to Gemini ---
print("Sending to Gemini...")
try:
    # Instruction for JSON mode
    response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
    raw_content = response.text
except Exception as e:
    print(f"Gemini API Error: {e}")
    exit(1)

# --- Parsing Response ---
# Cleanup potential markdown formatting
cleaned_content = raw_content.replace("```json", "").replace("```", "").strip()

comments_to_send = []

try:
    ai_comments = json.loads(cleaned_content)
    
    # Validate and filter comments
    for comment in ai_comments:
        # Check if the file belongs to this PR
        if comment['path'] in files_to_check:
            comments_to_send.append({
                'path': comment['path'],
                'line': int(comment['line']),
                'body': f"🤖 **AI Review:** {comment['body']}"
            })
except json.JSONDecodeError:
    print("Failed to parse JSON from Gemini. Raw response:")
    print(raw_content)
    # Fallback to general comment if JSON fails
    pr.create_issue_comment(f"### 🤖 AI Review Failed to Parse\nGemini returned invalid format.\n\nRaw:\n{raw_content}")
    exit(0)

# --- Posting Review to GitHub ---
if comments_to_send:
    print(f"Posting {len(comments_to_send)} inline comments...")
    try:
        # create_review creates a "Review" event with multiple comments
        pr.create_review(
            commit=last_commit,
            body="### 🤖 AI Code Review\nI found a few issues that need attention. See comments in the code.",
            event="COMMENT", # Or "REQUEST_CHANGES" to block merge
            comments=comments_to_send
        )
        print("Success!")
    except Exception as e:
        print(f"GitHub API Error: {e}")
        print("Possibly Gemini calculated the wrong line number (referenced a line not in the diff).")
else:
    print("No critical issues found by AI.")
    pr.create_issue_comment("### 🤖 AI Review\nThe code looks clean! ✨")
