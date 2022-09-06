import { DEFAULT_CURRENCY, DEFAULT_LANGUAGE } from '~/constants/locales';

export default new Intl.NumberFormat(DEFAULT_LANGUAGE, {
  style: 'currency',
  currency: DEFAULT_CURRENCY,
});
