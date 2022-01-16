const calculateHighestTotal = (array: any[]) => {
  return array.reduce(
    (previousValue, currentValue) =>
      currentValue[2] > previousValue ? currentValue[2] : previousValue,
    0,
  );
};

export default calculateHighestTotal;
