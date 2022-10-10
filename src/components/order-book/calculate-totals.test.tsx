import calculateTotals from './calculate-totals';
import { IOrder } from './types';

describe('calculateTotals', () => {
  describe('given empty rows', () => {
    const rows: IOrder[] = [];

    it('returns []', () => {
      const result = calculateTotals(rows);
      expect(result).toEqual([]);
    });
  });

  describe('given single rows', () => {
    const rows: IOrder[] = [[40000, 100]];

    it('calculates row', () => {
      const result = calculateTotals(rows);
      expect(result).toEqual([[40000, 100, 100]]);
    });
  });

  describe('given multiple rows', () => {
    const rows: IOrder[] = [
      [40000, 100],
      [40005, 1000],
    ];

    it('calculates row', () => {
      const result = calculateTotals(rows);
      expect(result).toEqual([
        [40000, 100, 100],
        [40005, 1000, 1100],
      ]);
    });
  });
});
