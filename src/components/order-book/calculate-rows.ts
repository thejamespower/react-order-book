import { IRow } from './types';

const calculateRows = (rows: IRow[]) => {
  let total = 0;

  return rows.map(([price, size]) => {
    total = total + size;

    return [price, size, total];
  });
};

export default calculateRows;
