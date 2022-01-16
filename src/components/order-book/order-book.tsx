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
    [orderBook.bids],
  );
  // asks with totals add
  const asks: IOBOrder[] = useMemo(
    () => calculateTotals(orderBook.asks),
    [orderBook.asks],
  );
  const highestTotal = useMemo(
    () => calculateHighestTotal([...bids, ...asks]),
    [bids, asks],
  );

  return (
    <div className="flex w-full px-8" data-testid="order-book">
      {!!bids.length ? (
        <div data-testid="order-book-bids" className="flex-1">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500">
                <th className="text-right p-1 pr-8 font-bold">
                  {translation.total}
                </th>
                <th className="text-right p-1 pr-8 font-bold">
                  {translation.size}
                </th>
                <th className="text-right p-1 pr-8 font-bold">
                  {translation.price}
                </th>
              </tr>
            </thead>

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
                      background: `linear-gradient(to right, transparent ${stop}%, rgb(20 83 45) ${stop}%)`,
                    }}>
                    <td className="text-right p-1 pr-8 font-bold">{total}</td>
                    <td className="text-right p-1 pr-8 font-bold">{size}</td>
                    <td className="text-right p-1 pr-8 font-bold text-green-500">
                      {price}
                    </td>
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
            <thead>
              <tr className="text-gray-500">
                <th className="text-right p-1 pr-8 font-bold">
                  {translation.price}
                </th>
                <th className="text-right p-1 pr-8 font-bold">
                  {translation.size}
                </th>
                <th className="text-right p-1 pr-8 font-bold">
                  {translation.total}
                </th>
              </tr>
            </thead>

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
                      background: `linear-gradient(to left, transparent ${stop}%, rgb(127 29 29) ${stop}%)`,
                    }}>
                    <td className="text-right p-1 pr-8 font-bold text-red-500">
                      {price}
                    </td>
                    <td className="text-right p-1 pr-8 font-bold">{size}</td>
                    <td className="text-right p-1 pr-8 font-bold">{total}</td>
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
