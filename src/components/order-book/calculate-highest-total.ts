import { IOBOrder } from './types';

const calculateHighestTotal = (array: IOBOrder[]) =>
  array.reduce(
    (previousValue, [, , total]) =>
      total > previousValue ? total : previousValue,
    0,
  );

export default calculateHighestTotal;
