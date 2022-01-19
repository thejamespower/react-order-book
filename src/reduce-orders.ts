import { IWSOrder } from './components/order-book/types';

export const reduceOrders = (
  previousOldOrders: IWSOrder[],
  order: IWSOrder,
) => {
  const [price, size] = order;
  // remove zero sized orders
  if (size === 0) {
    return previousOldOrders.filter((oldOrder) => oldOrder[0] !== price);
  }

  // updates
  if (size > 0) {
    // update old prices with new sizes
    if (previousOldOrders.find((oldOrder) => oldOrder[0] === price)) {
      return previousOldOrders.map((oldOrder) =>
        oldOrder[0] === price ? order : oldOrder,
      );
    }

    // add new prices
    return [...previousOldOrders, order];
  }

  return previousOldOrders;
};
