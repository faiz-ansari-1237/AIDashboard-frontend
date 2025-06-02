// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';
// Add more language imports as needed

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      es: {
        translation: esTranslation
      }
      // Add more languages here
    },
    lng: 'en', // default language
    fallbackLng: 'en', // language to use if translations in user language are not available

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;