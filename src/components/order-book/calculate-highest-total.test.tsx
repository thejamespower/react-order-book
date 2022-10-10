import calculateHighestTotal from './calculate-highest-total';
import { IOrderWithTotal } from './types';

describe('calculateHighestTotal', () => {
  describe('given empty rows', () => {
    const rows: IOrderWithTotal[] = [];

    it('returns 0', () => {
      const result = calculateHighestTotal(rows);
      expect(result).toEqual(0);
    });
  });

  describe('given single rows', () => {
    const rows: IOrderWithTotal[] = [[40000, 100, 100]];

    it('calculates highest total', () => {
      const result = calculateHighestTotal(rows);
      expect(result).toEqual(100);
    });
  });

  describe('given multiple rows', () => {
    const rows: IOrderWithTotal[] = [
      [40000, 100, 100],
      [40005, 1000, 1100],
    ];

    it('calculates highest total', () => {
      const result = calculateHighestTotal(rows);
      expect(result).toEqual(1100);
    });
  });
});
