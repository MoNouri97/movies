export const formatNumber = (i: number) => {
  return i > 999 ? `${(i / 1000).toFixed(1)}k` : i;
};
