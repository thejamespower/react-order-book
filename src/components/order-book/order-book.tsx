import React, { useMemo } from 'react';
import calculateTotals from './calculate-totals';
import { IOBOrder, IProps } from './types';
import calculateHighestTotal from './calculate-highest-total';
import calculateRowDepth from './calculate-row-depth';

const OrderBook: React.FC<IProps> = ({
  orderBook = { bids: [], asks: [] },
  translation,
}): null | JSX.Element => {
  // bids with totals add
  const bids: IOBOrder[] = useMemo(
    () => calculateTotals(orderBook.bids),
    [orderBook],
  );
  // asks with totals add
  const asks: IOBOrder[] = useMemo(
    () => calculateTotals(orderBook.asks),
    [orderBook],
  );
  const highestTotal = useMemo(
    () => calculateHighestTotal([...bids, ...asks]),
    [bids, asks],
  );

  const head = (
    <thead>
      <tr>
        <th className="p-4">{translation.total}</th>
        <th className="p-4">{translation.size}</th>
        <th className="p-4">{translation.price}</th>
      </tr>
    </thead>
  );

  const cells = (total: number, size: number, price: number) => (
    <>
      <td>{total}</td>
      <td>{size}</td>
      <td>{price}</td>
    </>
  );

  return (
    <div className="flex w-full px-8" data-testid="order-book">
      {!!bids.length ? (
        <div data-testid="order-book-bids" className="flex-1">
          <table className="w-full">
            {head}
            <tbody>
              {bids.map(([price, size, total]) => {
                if (!price || !size || !total) {
                  return null;
                }

                const rowDepth = calculateRowDepth(total, highestTotal);
                const stop = 100 - rowDepth;

                return (
                  <tr
                    key={price}
                    style={{
                      background: `linear-gradient(to right, transparent ${stop}%, green ${stop}%)`,
                    }}>
                    {cells(price, size, total)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}

      {!!asks.length ? (
        <div data-testid="order-book-asks" className="flex-1">
          <table className="w-full">
            {head}
            <tbody>
              {asks.map(([price, size, total]) => {
                if (!price || !size || !total) {
                  return null;
                }

                const rowDepth = calculateRowDepth(total, highestTotal);
                const stop = 100 - rowDepth;
                return (
                  <tr
                    key={price}
                    style={{
                      background: `linear-gradient(to left, transparent ${stop}%, red ${stop}%)`,
                    }}>
                    {cells(price, size, total)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default OrderBook;
