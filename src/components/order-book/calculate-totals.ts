import { IOBOrder, IWSOrder } from './types';

const calculateTotals = (rows: IWSOrder[]): IOBOrder[] => {
  let total = 0;

  return rows.map(([price, size]) => {
    total = total + size;

    return [price, size, total];
  });
};

export default calculateTotals;
