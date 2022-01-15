import React from 'react';

interface IProps {
  title?: string;
}

const Header: React.FC<IProps> = ({ children, title }) => {
  return (
    <header>
      {!!title && <h1 className="text-white">{title}</h1>}
      {children}
    </header>
  );
};

export default Header;
