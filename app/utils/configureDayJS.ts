import 'dayjs/locale/es-mx';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default function () {
  dayjs.extend(relativeTime);
  dayjs.locale('es-mx');
}
