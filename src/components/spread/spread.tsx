import React from 'react';

interface IProps {
  title?: string;
}

const Spread: React.FC<IProps> = ({ children, title }) => {
  const spread = '17.0';
  const spreadPercentage = '(0.05%)';

  return (
    <div>
      {!!title && <span>{title}:</span>} {spread} {spreadPercentage}
    </div>
  );
};

export default Spread;
