import calculateRowDepth from './calculate-row-depth';

describe('calculateRowDepth', () => {
  describe('given total', () => {
    const total = 100;

    describe('given highestTotal', () => {
      const highestTotal = 1000;

      it('calculates row depth', () => {
        expect(calculateRowDepth(total, highestTotal)).toEqual(10);
      });
    });
  });
});
