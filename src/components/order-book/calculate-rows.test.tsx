import calculateRows from './calculate-rows';
import { IRow } from './types';

describe('calculateRows', () => {
  describe('given empty rows', () => {
    const rows: IRow[] = [];

    it('returns []', () => {
      const result = calculateRows(rows);
      expect(result).toEqual([]);
    });
  });

  describe('given single rows', () => {
    const rows: IRow[] = [[40000, 100]];

    it('calculates row', () => {
      const result = calculateRows(rows);
      expect(result).toEqual([[40000, 100, 100]]);
    });
  });

  describe('given multiple rows', () => {
    const rows: IRow[] = [
      [40000, 100],
      [40005, 1000],
    ];

    it('calculates row', () => {
      const result = calculateRows(rows);
      expect(result).toEqual([
        [40000, 100, 100],
        [40005, 1000, 1100],
      ]);
    });
  });
});
