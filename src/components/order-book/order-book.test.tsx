import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderBook from './order-book';
import { translation } from '../../translation';

describe('OrderBook', () => {
  describe('given only bids', () => {
    const orderBook = {
      asks: [],
      bids: [[]],
    };

    it('renders bids table', () => {
      render(<OrderBook orderBook={orderBook} translation={translation} />);
      const element = screen.queryByTestId('order-book-bids');
      expect(element).toBeInTheDocument();
    });

    it('does not render asks table', () => {
      render(<OrderBook orderBook={orderBook} translation={translation} />);
      const element = screen.queryByTestId('order-book-asks');
      expect(element).not.toBeInTheDocument();
    });
  });

  describe('given only asks', () => {
    const orderBook = {
      bids: [],
      asks: [[]],
    };

    it('renders asks table', () => {
      render(<OrderBook orderBook={orderBook} translation={translation} />);
      const element = screen.queryByTestId('order-book-asks');
      expect(element).toBeInTheDocument();
    });

    it('does not render bids table', () => {
      render(<OrderBook orderBook={orderBook} translation={translation} />);
      const element = screen.queryByTestId('order-book-bids');
      expect(element).not.toBeInTheDocument();
    });
  });
});
