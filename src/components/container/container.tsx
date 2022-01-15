import React from 'react';

const Container: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen min-w-screen bg-black text-white">
      {children}
    </div>
  );
};

export default Container;
