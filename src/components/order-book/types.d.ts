export type IWSOrder = [number, number];

export type IOBOrder = [number, number, number];

export interface IOrderBook {
  bids: IWSOrder[];
  asks: IWSOrder[];
}

export interface IProps {
  translation: {
    total: string;
    size: string;
    price: string;
  };
  orderBook: {
    asks: IWSOrder[];
    bids: IWSOrder[];
  };
}
