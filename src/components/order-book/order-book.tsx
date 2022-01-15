import React, { useMemo } from 'react';
import calculateRows from './calculate-rows';
import { IProps } from './types';

const OrderBook: React.FC<IProps> = ({
  orderBook = { bids: [] },
  translation,
}): null | JSX.Element => {
  const calculatedRows = useMemo(
    () => calculateRows(orderBook.bids),
    [orderBook],
  );

  const lastRow = calculatedRows.at(-1);
  const highestTotal = lastRow ? lastRow.at(-1) : 0;

  return calculatedRows.length ? (
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
          {calculatedRows.map(([price, size, total]) => {
            const rowDepth = (total / (highestTotal ? highestTotal : 1)) * 100;
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
  ) : null;
};

export default OrderBook;
