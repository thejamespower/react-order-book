const calculateRowDepth = (total: number, highestTotal: number) =>
  (total / (highestTotal ? highestTotal : 1)) * 100;

export default calculateRowDepth;
