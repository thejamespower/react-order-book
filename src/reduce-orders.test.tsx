import { reduceOrders } from './reduce-orders';
import { IWSOrder } from './components/order-book/types';

describe('reduceOrders', () => {
  describe('given previousOldOrders', () => {
    const previousOldOrders: IWSOrder[] = [[40005, 10]];

    describe('given removal of order', () => {
      const order: IWSOrder = [40005, 0];

      it('removes order', () => {
        const result = reduceOrders(previousOldOrders, order);
        expect(result).toEqual([]);
      });
    });

    describe('given update of order', () => {
      const order: IWSOrder = [40005, 100];

      it('removes order', () => {
        const result = reduceOrders(previousOldOrders, order);
        expect(result).toEqual([[40005, 100]]);
      });
    });

    describe('given addition of order', () => {
      const order: IWSOrder = [40010, 100];

      it('adds order', () => {
        const result = reduceOrders(previousOldOrders, order);
        expect(result).toEqual([
          [40005, 10],
          [40010, 100],
        ]);
      });
    });
  });
});
