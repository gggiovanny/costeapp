import { FaTruck } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';

import { FIXED_COSTS_ROUTE } from '~/routes/fixed-costs/constants';
import { SUPPLIES_ROUTE } from '~/routes/supplies/constants';

export const LINKS = [
  { route: FIXED_COSTS_ROUTE, label: 'Costos fijos', Icon: MdAttachMoney },
  { route: SUPPLIES_ROUTE, label: 'Entradas y salidas', Icon: FaTruck },
];
