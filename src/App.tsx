import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import Container from './components/container';
import OrderBook from './components/order-book';

import { IOrderBook, IWSOrder } from './components/order-book/types';

import { translation } from './translation';
import {
  BTC_PRODUCT_ID,
  ETH_PRODUCT_ID,
  EVENT_SUBSCRIBE,
  EVENT_UNSUBSCRIBE,
  FEED_DELTA,
  FEED_SNAPSHOT,
} from './constants';

// @TODO: unit test removeTotals
// @TODO: move file removeTotals
const removeTotals = (bid: IWSOrder) => bid.slice(0, 2);

// @TODO: unit test reduceOrders
// @TODO: move file reduceOrders
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
  const [productId, setProductId] = useState(BTC_PRODUCT_ID);

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    'wss://www.cryptofacilities.com/ws/v1',
    {
      // @TODO: reconnect websocket on disconnect
      // @TODO: disconnect websocket on loss of focus (tab)
      // Will attempt to reconnect on all close events, such as server shutting down
      // shouldReconnect: (closeEvent) => true,
    },
  );

  useEffect(() => {
    if (readyState === 1) {
      sendJsonMessage({
        event: EVENT_SUBSCRIBE,
        feed: FEED_DELTA,
        product_ids: [productId],
      });
    }
  }, [productId, readyState, sendJsonMessage]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      const { feed } = data;
      const { bids, asks } = data;

      // snapshot message
      if (feed === FEED_SNAPSHOT) {
        setOrderBook({ bids, asks });
      }

      // delta message
      if (feed === FEED_DELTA) {
        if ((bids && bids.length) || (asks && asks.length)) {
          setOrderBook(({ asks: oldAsks, bids: oldBids }) => ({
            // @TODO: DRY setOrderBook array chaining
            asks: asks
              .reduce(reduceOrders, oldAsks)
              // sort ascending
              .sort((a: [number], b: [number]) => a[0] - b[0])
              // @TODO: dynamic length
              .slice(0, 24),
            bids: bids
              .reduce(reduceOrders, oldBids)
              // sort descending
              .sort((a: [number], b: [number]) => b[0] - a[0])
              .slice(0, 24),
          }));
        }
      }
    }
  }, [lastMessage]);

  return (
    <Container>
      <p className="p-4">
        Pair:{' '}
        <span className="font-semibold">
          {productId === BTC_PRODUCT_ID ? 'BTCUSD' : 'ETHUSD'}
        </span>
      </p>

      <OrderBook translation={translation} orderBook={orderBook} />

      <div className="flex justify-center p-8">
        <button
          className="bg-purple-700 py-4 px-8 rounded font-bold"
          onClick={() =>
            setProductId((oldFeed) => {
              sendJsonMessage({
                event: EVENT_UNSUBSCRIBE,
                feed: FEED_DELTA,
                product_ids: [oldFeed],
              });
              return oldFeed === BTC_PRODUCT_ID
                ? ETH_PRODUCT_ID
                : BTC_PRODUCT_ID;
            })
          }>
          {translation.toggleFeed}
        </button>
      </div>
    </Container>
  );
};

export default App;
