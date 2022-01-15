import React from 'react';

const Container: React.FC = ({ children }) => {
  return <div className="min-h-screen min-w-screen bg-black">{children}</div>;
};

export default Container;
