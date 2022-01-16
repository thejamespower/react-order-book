import React from 'react';
import { ICalculatedRow, IOrderBook } from '../order-book/types';
import calculateSpread from './calculate-spread';
import calculateSpreadPercent from './calculate-spread-percent';

interface IProps {
  title?: string;
  orderBook: IOrderBook;
}

const getTopItem = (orders: ICalculatedRow[]) => orders[0][0];

const Spread: React.FC<IProps> = ({ title, orderBook }): null | JSX.Element => {
  const { bids, asks } = orderBook;

  if (!bids || !bids.length || !asks || !asks.length) {
    return null;
  }

  const topAsk = getTopItem(asks);
  const topBid = getTopItem(bids);

  const spread = calculateSpread(topAsk, topBid);
  const spreadPercentage = calculateSpreadPercent(spread, topAsk);

  return (
    <div className="text-center">
      {!!title && <span>{title}:</span>} {spread} (
      {Math.round((spreadPercentage * 100 + Number.EPSILON) * 100) / 100}%)
    </div>
  );
};

export default Spread;
