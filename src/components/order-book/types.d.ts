export type IRow = number[];

export type ICalculatedRow = IRow;

export interface IOrderBook {
  bids: ICalculatedRow[];
}

export interface IProps {
  translation: {
    total: string;
    size: string;
    price: string;
  };
  orderBook: {
    bids: IRow[] | [];
  };
}
