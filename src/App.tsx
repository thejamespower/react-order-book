import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import Container from './components/container';
import Header from './components/header';
import Spread from './components/spread';
import OrderBook from './components/order-book';
import { IOrderBook, IWSOrder } from './components/order-book/types';
import { translation } from './translation';

const removeTotals = (bid: IWSOrder) => bid.slice(0, 2);

const reduceOrders = (previousOldOrders: IWSOrder[], order: IWSOrder) => {
  const [price, size] = order;
  // remove zero sized orders
  if (size === 0) {
    // console.log('Delete order: ', price);
    return previousOldOrders
      .filter((oldOrder) => oldOrder[0] !== price)
      .map(removeTotals);
  }

  // updates
  if (size > 0) {
    // update old prices with new sizes
    if (previousOldOrders.find((oldOrder) => oldOrder[0] === price)) {
      // console.log('Update order: ', price);
      return previousOldOrders
        .map((oldOrder) => (oldOrder[0] === price ? order : oldOrder))
        .map(removeTotals);
    }

    // add new prices
    if (previousOldOrders.find((oldOrder) => oldOrder[0] !== price)) {
      // console.log('Add order: ', price);
      return [...previousOldOrders, order].map(removeTotals);
    }
  }

  return previousOldOrders;
};

const App = () => {
  const [orderBook, setOrderBook] = useState<IOrderBook>({
    bids: [],
    asks: [],
  });

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    'wss://www.cryptofacilities.com/ws/v1',
    {
      //   //Will attempt to reconnect on all close events, such as server shutting down
      //   shouldReconnect: (closeEvent) => true,
    },
  );

  useEffect(() => {
    if (readyState === 1) {
      sendJsonMessage({
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: ['PI_XBTUSD'],
      });
    }
  }, [readyState, sendJsonMessage]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      const { feed } = data;
      const { bids, asks } = data;

      // snapshot message
      if (feed === 'book_ui_1_snapshot') {
        setOrderBook({ bids, asks });
      }

      // delta message
      if (feed === 'book_ui_1') {
        if ((bids && bids.length) || (asks && asks.length)) {
          setOrderBook(({ asks: oldAsks, bids: oldBids }) => ({
            asks: asks
              .reduce(reduceOrders, oldAsks)
              // sort ascending
              .sort((a: IWSOrder, b: IWSOrder) => a[0] - b[0])
              .slice(0, 24),
            bids: bids
              .reduce(reduceOrders, oldBids)
              // sort descending
              .sort((a: IWSOrder, b: IWSOrder) => b[0] - a[0])
              .slice(0, 24),
          }));
        }
      }
    }
  }, [lastMessage]);

  return (
    <Container>
      <Header title={translation.title}>
        <Spread title={translation.spread} orderBook={orderBook} />
      </Header>
      <OrderBook translation={translation} orderBook={orderBook} />
    </Container>
  );
};

export default App;
