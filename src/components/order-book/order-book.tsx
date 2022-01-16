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
    <div className="flex">
      {!!bids.length ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>{translation.total}</th>
                <th>{translation.size}</th>
                <th>{translation.price}</th>
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
        <div>
          <table>
            <thead>
              <tr>
                <th>{translation.price}</th>
                <th>{translation.size}</th>
                <th>{translation.total}</th>
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
