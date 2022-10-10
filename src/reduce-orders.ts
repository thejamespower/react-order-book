import { IOrder } from './components/order-book/types';

export const reduceOrders = (
  previousOrders: IOrder[],
  order: IOrder,
) => {
  const [price, size] = order;
  // remove zero sized orders
  if (size === 0) {
    return previousOrders.filter((oldOrder) => oldOrder[0] !== price);
  }

  // updates
  if (size > 0) {
    // update old prices with new sizes
    if (previousOrders.find((oldOrder) => oldOrder[0] === price)) {
      return previousOrders.map((oldOrder) =>
        oldOrder[0] === price ? order : oldOrder,
      );
    }

    // add new prices
    return [...previousOrders, order];
  }

  return previousOrders;
};
