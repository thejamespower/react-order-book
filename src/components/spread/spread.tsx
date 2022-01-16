import React from 'react';
import { IOrderBook } from '../order-book/types';

interface IProps {
  title?: string;
  orderBook: IOrderBook;
}

const Spread: React.FC<IProps> = ({
  children,
  title,
  orderBook,
}): null | JSX.Element => {
  const { bids, asks } = orderBook;

  if (!bids || !bids.length || !asks || !asks.length) {
    return null;
  }

  const spread = asks[0][0] - bids[0][0];
  const spreadPercentage = spread / asks[0][0];

  return (
    <div className="text-center">
      {!!title && <span>{title}:</span>} {spread} (
      {Math.round((spreadPercentage * 100 + Number.EPSILON) * 100) / 100}%)
    </div>
  );
};

export default Spread;
