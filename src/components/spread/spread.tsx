import React from 'react';
import { IOrderBook, IWSOrder } from '../order-book/types';
import calculateSpread from './calculate-spread';
import calculateSpreadPercent from './calculate-spread-percent';

interface IProps {
  title?: string;
  orderBook: IOrderBook;
}

export const getTopOrder = (orders: IWSOrder[]) => orders[0][0];

export const round = (number: number) =>
  Math.round((number + Number.EPSILON) * 100) / 100;

export const validateOrders = (bids: IWSOrder[], asks: IWSOrder[]) =>
  bids && bids.length && asks && asks.length;

const Spread: React.FC<IProps> = ({ title, orderBook }): null | JSX.Element => {
  const { bids, asks } = orderBook;

  if (!validateOrders(bids, asks)) {
    return null;
  }

  const topAsk = getTopOrder(asks);
  const topBid = getTopOrder(bids);
  const spread = calculateSpread(topAsk, topBid);
  const spreadPercentage = calculateSpreadPercent(spread, topAsk);

  return (
    <div className="text-center">
      {!!title && <span>{title}:</span>} {spread} ({round(spreadPercentage)}%)
    </div>
  );
};

export default Spread;
