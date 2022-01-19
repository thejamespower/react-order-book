export const BTC_PRODUCT_ID = 'PI_XBTUSD';
export const ETH_PRODUCT_ID = 'PI_ETHUSD';

export const BTC_CURRENCY_CODE = 'BTCUSD';
export const ETH_CURRENCY_CODE = 'ETHUSD';

export const PRODUCTS: { code: string; id: string }[] = [
  {
    id: BTC_PRODUCT_ID,
    code: BTC_CURRENCY_CODE,
  },
  {
    id: ETH_PRODUCT_ID,
    code: ETH_CURRENCY_CODE,
  },
];

export const FEED_SNAPSHOT = 'book_ui_1_snapshot';
export const FEED_DELTA = 'book_ui_1';

export const EVENT_SUBSCRIBE = 'subscribe';
export const EVENT_UNSUBSCRIBE = 'unsubscribe';

export const webSocketUrl = 'wss://www.cryptofacilities.com/ws/v1';
