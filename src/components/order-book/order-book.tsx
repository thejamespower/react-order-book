import React, { useMemo } from 'react';
import calculateRows from './calculate-rows';
import { IProps } from './types';
import calculateHighestTotal from './calculate-highest-total';

const OrderBook: React.FC<IProps> = ({
  orderBook = { bids: [], asks: [] },
  translation,
}): null | JSX.Element => {
  const bids = useMemo(() => calculateRows(orderBook.bids), [orderBook]);
  const asks = useMemo(() => calculateRows(orderBook.asks), [orderBook]);
  const highestTotal = useMemo(
    () => calculateHighestTotal([...bids, ...asks]),
    [bids, asks],
  );

  return (
    <div className="flex w-full px-8">
      {!!bids.length ? (
        <div className="flex-1">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-4">{translation.total}</th>
                <th className="p-4">{translation.size}</th>
                <th className="p-4">{translation.price}</th>
              </tr>
            </thead>

            <tbody>
              {bids.map(([price, size, total]) => {
                const rowDepth =
                  (total / (highestTotal ? highestTotal : 1)) * 100;
                const stop = 100 - rowDepth;
                return (
                  <tr
                    key={price}
                    style={{
                      background: `linear-gradient(to right, transparent ${stop}%, green ${stop}%)`,
                    }}>
                    <td>{total}</td>
                    <td>{size}</td>
                    <td>{price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}

      {!!asks.length ? (
        <div className="flex-1">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-4">{translation.price}</th>
                <th className="p-4">{translation.size}</th>
                <th className="p-4">{translation.total}</th>
              </tr>
            </thead>

            <tbody>
              {asks.map(([price, size, total]) => {
                const rowDepth =
                  (total / (highestTotal ? highestTotal : 1)) * 100;
                const stop = 100 - rowDepth;
                return (
                  <tr
                    key={price}
                    style={{
                      background: `linear-gradient(to left, transparent ${stop}%, red ${stop}%)`,
                    }}>
                    <td>{price}</td>
                    <td>{size}</td>
                    <td>{total}</td>
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
