import calculateHighestTotal from './calculate-highest-total';
import { ICalculatedRow } from './types';

describe('calculateHighestTotal', () => {
  describe('given empty rows', () => {
    const rows: ICalculatedRow[] = [];

    it('returns 0', () => {
      const result = calculateHighestTotal(rows);
      expect(result).toEqual(0);
    });
  });

  describe('given single rows', () => {
    const rows: ICalculatedRow[] = [[40000, 100, 100]];

    it('calculates row', () => {
      const result = calculateHighestTotal(rows);
      expect(result).toEqual(100);
    });
  });

  describe('given multiple rows', () => {
    const rows: ICalculatedRow[] = [
      [40000, 100, 100],
      [40005, 1000, 1100],
    ];

    it('calculates row', () => {
      const result = calculateHighestTotal(rows);
      expect(result).toEqual(1100);
    });
  });
});
