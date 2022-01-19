import React, { useCallback, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import Container from './components/container';
import OrderBook from './components/order-book';

import { IOrderBook } from './components/order-book/types';

import { translation } from './translation';
import {
  EVENT_SUBSCRIBE,
  EVENT_UNSUBSCRIBE,
  FEED_DELTA,
  FEED_SNAPSHOT,
  PRODUCTS,
  webSocketUrl,
} from './constants';
import Button from './components/button/button';
import { reduceOrders } from './reduce-orders';

const App = () => {
  const [orderBook, setOrderBook] = useState<IOrderBook>({
    bids: [],
    asks: [],
  });
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [paused, setPaused] = useState(false);

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    webSocketUrl,
    {
      // Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: () => true,
    },
  );

  const sendDeltaMessage = useCallback(
    (event: string) => {
      sendJsonMessage({
        event,
        feed: FEED_DELTA,
        product_ids: [productId],
      });
    },
    [productId, sendJsonMessage],
  );

  // watch websocket readyState
  useEffect(() => {
    // if okay
    if (readyState === 1) {
      // if paused, we just unsubscribed
      if (paused) {
        return;
      }

      sendDeltaMessage(EVENT_SUBSCRIBE);
    }
  }, [paused, productId, readyState, sendDeltaMessage]);

  // watch for new message
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
              .sort((a: [number], b: [number]) => a[0] - b[0]),
            bids: bids
              .reduce(reduceOrders, oldBids)
              // sort descending
              .sort((a: [number], b: [number]) => b[0] - a[0]),
          }));
        }
      }
    }
  }, [lastMessage]);

  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    sendDeltaMessage(EVENT_UNSUBSCRIBE);
    setPaused(true);
  };

  // bind events
  useEffect(() => {
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('blur', onBlur);
    };
  });

  return (
    <Container>
      {paused && (
        <div className="absolute bg-black/80 top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center">
          <div className="text-center bg-black p-8 rounded-lg">
            <p className="mb-8">{translation.paused}</p>
            <Button
              onClick={() => {
                sendDeltaMessage(EVENT_SUBSCRIBE);
                setPaused(false);
              }}>
              {translation.reconnect}
            </Button>
          </div>
        </div>
      )}

      <header className="p-4 pt-8">
        <p className="mb-4 text-center">
          {translation.pair}:{' '}
          <span className="font-semibold">
            {PRODUCTS.length &&
              PRODUCTS.find((product) => product?.id === productId)?.code}
          </span>
        </p>

        <table className="table-fixed min-w-full text-center">
          <thead>
            <tr>
              <th>Bid</th>
              <th>Ask</th>
            </tr>
          </thead>
          <tbody>
            <tr className="font-bold text-lg">
              <td className="w-1/2 text-green-500">
                {orderBook.bids.length && orderBook.bids[0][0]}
              </td>
              <td className="w-1/2 text-red-500">
                {orderBook.asks.length && orderBook.asks[0][0]}
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <OrderBook translation={translation} orderBook={orderBook} />

      <div className="text-center p-8">
        <p>{translation.availablePairs}:</p>
        <ul className="mb-4">
          {PRODUCTS.map((product) => {
            return (
              <li
                key={product.id}
                className={product.id === productId ? 'font-bold' : ''}>
                {product.code}
              </li>
            );
          })}
        </ul>
        <Button
          onClick={() =>
            setProductId((oldFeed) => {
              const index = PRODUCTS.findIndex(
                (product) => product.id === productId,
              );
              sendJsonMessage({
                event: EVENT_UNSUBSCRIBE,
                feed: FEED_DELTA,
                product_ids: [oldFeed],
              });
              return index + 1 === PRODUCTS.length
                ? PRODUCTS[0].id
                : PRODUCTS[index + 1].id;
            })
          }>
          {translation.toggleFeed}
        </Button>
      </div>
    </Container>
  );
};

export default App;
