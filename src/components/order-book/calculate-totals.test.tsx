import calculateTotals from './calculate-totals';
import { IWSOrder } from './types';

describe('calculateTotals', () => {
  describe('given empty rows', () => {
    const rows: IWSOrder[] = [];

    it('returns []', () => {
      const result = calculateTotals(rows);
      expect(result).toEqual([]);
    });
  });

  describe('given single rows', () => {
    const rows: IWSOrder[] = [[40000, 100]];

    it('calculates row', () => {
      const result = calculateTotals(rows);
      expect(result).toEqual([[40000, 100, 100]]);
    });
  });

  describe('given multiple rows', () => {
    const rows: IWSOrder[] = [
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
