import { IOrderWithTotal, IOrder } from './types';

const calculateTotals = (rows: IOrder[]): IOrderWithTotal[] => {
  let total = 0;

  return rows.map(([price, size]) => {
    total = total + size;

    return [price, size, total];
  });
};

export default calculateTotals;
