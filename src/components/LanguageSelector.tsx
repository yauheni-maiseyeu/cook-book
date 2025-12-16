import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { UIText } from './ui/UIText';
import { UIButton } from './ui/UIButton';
import { UIModal } from './ui/UIModal';
import { useModal } from '@/hooks/useModal';
import Colors from '@/constants/Colors';
import { storage, LANGUAGE_KEY } from '@/storage';

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const { isOpen, onOpen, onClose } = useModal();

  const [tempLang, setTempLang] = useState(i18n.language);

  const languages = [
    { code: 'ru', label: 'Русский', flag: '🇷🇺', short: 'Ру' },
    { code: 'en', label: 'English', flag: '🇬🇧', short: 'En' },
  ];

  const currentLangObj = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    if (isOpen) {
      setTempLang(i18n.language);
    }
  }, [isOpen, i18n.language]);

  const handleApply = () => {
    i18n.changeLanguage(tempLang);
    storage.set(LANGUAGE_KEY, tempLang);
    onClose();
  };

  return (
    <>
      <TouchableOpacity style={styles.headerButton} onPress={onOpen}>
        <UIText style={styles.flag}>{currentLangObj.flag}</UIText>
        <UIText style={styles.langCode}>{currentLangObj.short}</UIText>
      </TouchableOpacity>

      <UIModal isOpen={isOpen} onClose={onClose}>
        <View style={styles.container}>
          <UIText type="header" style={styles.title}>
            {t('selectLanguage')}
          </UIText>

          <View style={styles.optionsContainer}>
            {languages.map((lang) => {
              const isActive = tempLang === lang.code;
              return (
                <TouchableOpacity
                  key={lang.code}
                  style={[styles.option, isActive && styles.optionActive]}
                  onPress={() => setTempLang(lang.code)}
                >
                  <UIText style={styles.optionFlag}>{lang.flag}</UIText>
                  <UIText style={[styles.optionText, isActive && styles.optionTextActive]}>
                    {lang.label}
                  </UIText>
                  <View style={[styles.radioOuter, isActive && styles.radioOuterActive]}>
                    {isActive && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <UIButton label={t('apply')} action={handleApply} style={styles.applyButton} />
        </View>
      </UIModal>
    </>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 8,
  },
  flag: { fontSize: 18 },
  langCode: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },

  container: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.codGray,
  },
  optionsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 25,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.nobel,
    backgroundColor: 'transparent',
  },
  optionActive: {
    borderColor: Colors.tango,
    backgroundColor: 'rgba(237, 110, 70, 0.05)',
  },
  optionFlag: {
    fontSize: 24,
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: Colors.codGray,
    flex: 1,
  },
  optionTextActive: {
    fontWeight: 'bold',
    color: Colors.tango,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.nobel,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: Colors.tango,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.tango,
  },
  applyButton: {
    width: '100%',
    backgroundColor: Colors.tango,
  },
});
