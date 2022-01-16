import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import Container from './components/container';
import Header from './components/header';
import Spread from './components/spread';
import OrderBook from './components/order-book';
import { IOrderBook, IRow } from './components/order-book/types';

const translation = {
  title: 'Order book',
  spread: 'Spread',
  total: 'Total',
  size: 'Size',
  price: 'Price',
};

const removeTotals = (bid: IRow) => bid.slice(0, 2);

const reduceOrders = (previousOldOrders: IRow[], order: IRow) => {
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
      return [...previousOldOrders, order].slice(0, 24).map(removeTotals);
    }
  }

  return previousOldOrders;
};

const App = () => {
  const [orderBook, setOrderBook] = useState<IOrderBook>({
    bids: [],
    asks: [],
  });

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket('wss://www.cryptofacilities.com/ws/v1', {
    //   //Will attempt to reconnect on all close events, such as server shutting down
    //   shouldReconnect: (closeEvent) => true,
  });

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
        const { bids: oldBids, asks: oldAsks } = orderBook;

        if ((bids && bids.length) || (asks && asks.length)) {
          setOrderBook({
            asks: asks
              .reduce(reduceOrders, oldAsks)
              .sort((a: IRow, b: IRow) => a[0] - b[0]),
            bids: bids
              .reduce(reduceOrders, oldBids)
              .sort((a: IRow, b: IRow) => b[0] - a[0]),
          });
        }
      }
    }
  }, [lastMessage, orderBook, setOrderBook]);

  return (
    <Container>
      <Header title={translation.title}>
        {/*<Spread title={translation.spread} />*/}
      </Header>
      <OrderBook translation={translation} orderBook={orderBook} />
    </Container>
  );
};

export default App;
