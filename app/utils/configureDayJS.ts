import 'dayjs/locale/es-mx';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { DAYJS_LOCALE } from '~/constants/locales';

export default function () {
  dayjs.extend(relativeTime);
  dayjs.locale(DAYJS_LOCALE);
}
