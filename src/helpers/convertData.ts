import { ChartData } from '../interfaces/interfaces';

export const convertData = (
  data: ChartData | null,
  type: 'prices' | 'market_caps' | 'total_volumes'
) => {
  if (!data) return [];

  const convertedData = data[type].map((item) => {
    return {
      date: item[0],
      [type]: item[1].toFixed(2),
    };
  });

  return convertedData;
};

export default convertData;
