import React, { useEffect, useState } from 'react';
import Container from './components/container';
import Header from './components/header';
import Spread from './components/spread';
import OrderBook from './components/order-book';
import { IOrderBook } from './components/order-book/types';

const translation = {
  title: 'Order book',
  spread: 'Spread',
  total: 'Total',
  size: 'Size',
  price: 'Price',
};

const App = () => {
  const [orderBook, setOrderBook] = useState<IOrderBook>({ bids: [] });

  useEffect(() => {
    const socket = new WebSocket('wss://www.cryptofacilities.com/ws/v1');

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          event: 'subscribe',
          feed: 'book_ui_1',
          product_ids: ['PI_XBTUSD'],
        }),
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { feed } = data;

      // Snapshot message
      if (feed === 'book_ui_1_snapshot') {
        const { bids, asks } = data;
        setOrderBook({ bids });
      }
    };
  }, []);

  return (
    <Container>
      <Header title={translation.title}>
        <Spread title={translation.spread} />

        <OrderBook translation={translation} orderBook={orderBook} />
      </Header>
    </Container>
  );
};

export default App;
