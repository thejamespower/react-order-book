import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderBook from './order-book';
import { IOrderBook } from './types';
import { translation } from '../../translation';

describe('OrderBook', () => {
  const assertCells = (expected: number[]) => {
    const cells = screen.getAllByTestId('grid-cell');

    cells.forEach((cell, i) => {
      expect(cell.innerHTML).toEqual(`${expected[i]}`);
    });
  };

  test.each([
    [
      'given bids and no asks',
      {
        bids: [[40000, 100]],
        asks: [],
      },
      [100, 100, 40000],
    ],
    [
      'given asks and no bids',
      {
        bids: [],
        asks: [[40010, 200]],
      },
      [40010, 200, 200],
    ],
    [
      'given one row of asks and bids',
      {
        bids: [[40000, 100]],
        asks: [[40010, 200]],
      },
      [100, 100, 40000, 40010, 200, 200],
    ],
    [
      'given two rows of asks and bids',
      {
        bids: [
          [40000, 100],
          [39990, 1000],
        ],
        asks: [
          [40010, 200],
          [40020, 2000],
        ],
      },
      [100, 100, 40000, 1100, 1000, 39990, 40010, 200, 200, 40020, 2000, 2200],
    ],
  ] as [string, IOrderBook, number[]][])(
    `%s, renders correctly`,
    (title, orderBook, expected) => {
      render(<OrderBook translation={translation} orderBook={orderBook} />);
      assertCells(expected);
    },
  );
});
