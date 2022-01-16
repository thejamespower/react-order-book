import React from 'react';
import Heading from '../heading';

interface IProps {
  title?: string;
}

const Header: React.FC<IProps> = ({ children, title }) => {
  return (
    <header className="flex p-4 space-between">
      {!!title && <Heading>{title}</Heading>}
      <div className="mx-auto -translate-x-1/4">{children}</div>
    </header>
  );
};

export default Header;
