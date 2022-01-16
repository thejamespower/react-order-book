import calculateSpread from './calculate-spread';

describe('calculateSpread', () => {
  describe('given ask', () => {
    const ask = 10;

    describe('given bid', () => {
      const bid = 9;

      it('returns spread', () => {
        const spread = calculateSpread(ask, bid);
        expect(spread).toEqual(1);
      });
    });
  });
});
