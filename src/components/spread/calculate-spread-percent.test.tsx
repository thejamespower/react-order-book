import calculateSpreadPercent from './calculate-spread-percent';

describe('calculateSpreadPercent', () => {
  describe('given spread', () => {
    const spread = 1;

    describe('given ask', () => {
      const ask = 10;

      it('returns spread percentage', () => {
        const spreadPercentage = calculateSpreadPercent(spread, ask);
        expect(spreadPercentage).toEqual(10);
      });
    });
  });
});
