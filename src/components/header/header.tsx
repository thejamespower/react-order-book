import React from 'react';
import Heading from '../heading';

interface IProps {
  title?: string;
}

const Header: React.FC<IProps> = ({ children, title }) => {
  return (
    <header className="p-4">
      {!!title && <Heading>{title}</Heading>}
      {children}
    </header>
  );
};

export default Header;
