import Localization from 'i18next';
import {initReactI18next} from 'react-i18next';
import localesResource from '@/assets/locales';

Localization.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  lng: 'en',
  debug: __DEV__,
  resources: localesResource,
  interpolation: {
    escapeValue: false,
  },
});

export default Localization;
