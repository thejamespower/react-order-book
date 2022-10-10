import { IOrderWithTotal } from './types';

const calculateHighestTotal = (array: IOrderWithTotal[]) =>
  array
    .map(([, , total]) => total)
    .reduce(
      (previousValue, total) => (total > previousValue ? total : previousValue),
    0,
  );

export default calculateHighestTotal;
