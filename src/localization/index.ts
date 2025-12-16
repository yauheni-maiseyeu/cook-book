import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import 'intl-pluralrules';
import { storage, LANGUAGE_KEY } from '@/storage';

import ru from './ru.json';
import en from './en.json';

const resources = {
  ru: { translation: ru },
  en: { translation: en },
};

const savedLanguage = storage.getString(LANGUAGE_KEY);

const deviceLanguage = getLocales()[0]?.languageCode;

const languageToUse = savedLanguage
  ? savedLanguage
  : ['ru', 'en'].includes(deviceLanguage || '')
  ? deviceLanguage
  : 'ru';

i18n.use(initReactI18next).init({
  resources,
  lng: languageToUse,
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
} as any);

export default i18n;
