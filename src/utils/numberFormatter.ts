export const formatNumber = (value: number): string => {
    const options = { maximumFractionDigits: 2 };
    return Intl.NumberFormat("en-US", options).format(value);
  };