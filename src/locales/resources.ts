import { Resource } from 'i18next';

import commonEN from './EN/common.json';
import commonRU from './RU/common.json';

import authEN from './EN/auth.json';
import authRU from './RU/auth.json';

export const resources: Resource = {
  en: {
    common: commonEN,
    auth: authEN,
  },
  ru: {
    common: commonRU,
    auth: authRU,
  },
};
