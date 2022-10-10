import React from 'react';
import { IOrderBook, IOrder } from '../order-book/types';
import calculateSpread from './calculate-spread';
import calculateSpreadPercent from './calculate-spread-percent';

interface IProps {
  title?: string;
  orderBook: IOrderBook;
}

// @TODO: move file getTopOrder
export const getTopOrder = (orders: IOrder[]) => orders[0][0];

// @TODO: move file round
export const round = (number: number) =>
  Math.round((number + Number.EPSILON) * 100) / 100;

// @TODO: move file validateOrders
// @TODO: create validateOrder that can be extended for orders[] to replace validateOrders
export const validateOrders = (bids: IOrder[], asks: IOrder[]) =>
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
    <div className="text-center text-gray-500">
      {!!title && <span>{title}:</span>} {round(spread)} (
      {round(spreadPercentage)}%)
    </div>
  );
};

export default Spread;
