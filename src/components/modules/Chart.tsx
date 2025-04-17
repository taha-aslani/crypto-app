import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

import { ChartProps } from '../../interfaces/interfaces';
import classes from './styles/Chart.module.css';
import Loader from './Loader';
import convertData from '../../helpers/convertData';

const Chart: React.FC<ChartProps> = ({ chart, setChart, chartLoading }) => {
  const [type, setType] = useState<'prices' | 'market_caps' | 'total_volumes'>(
    'prices'
  );

  const handleTypeChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLButtonElement).tagName !== 'BUTTON') return;
    const buttonText = (
      e.target as HTMLButtonElement
    ).textContent?.toLowerCase();

    if (buttonText === 'prices') setType('prices');
    else if (buttonText === 'market cap') setType('market_caps');
    else if (buttonText === 'total volume') setType('total_volumes');
  };

  return (
    <div className={classes.container}>
      <span
        onClick={() => setChart && setChart(null)}
        className={classes.cross}
      >
        X
      </span>
      <div className={classes.chart}>
        {chartLoading ? (
          <Loader />
        ) : (
          <>
            <div className={classes.name}>
              <img src={chart?.coin?.image} alt={chart?.coin?.name} />
              <p>{chart?.coin?.name}</p>
            </div>
            <div className={classes.graph}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={400}
                  height={400}
                  data={convertData(chart, type)}
                >
                  <Line
                    dataKey={type}
                    type="monotone"
                    stroke="#3874ff"
                    strokeWidth="2px"
                  />
                  <CartesianGrid stroke="#404042" />
                  <YAxis dataKey={type} domain={['auto', 'auto']} />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className={classes.types} onClick={handleTypeChange}>
              <button className={type === 'prices' ? classes.selected : ''}>
                Prices
              </button>
              <button
                className={type === 'market_caps' ? classes.selected : ''}
              >
                Market Cap
              </button>
              <button
                className={type === 'total_volumes' ? classes.selected : ''}
              >
                Total Volume
              </button>
            </div>
            <div className={classes.details}>
              <div>
                <p>Price: </p>
                <span>
                  {chart?.currency === 'usd'
                    ? `$${chart?.coin?.current_price.toLocaleString()}`
                    : chart?.currency === 'eur'
                    ? `€${chart?.coin?.current_price.toLocaleString()}`
                    : `¥${chart?.coin?.current_price.toLocaleString()}`}
                </span>
              </div>
              <div>
                <p>ATH: </p>
                <span>
                  {chart?.currency === 'usd'
                    ? `$${chart?.coin?.ath.toLocaleString()}`
                    : chart?.currency === 'eur'
                    ? `€${chart?.coin?.ath.toLocaleString()}`
                    : `¥${chart?.coin?.ath.toLocaleString()}`}
                </span>
              </div>
              <div>
                <p>Market Cap: </p>
                <span>
                  {chart?.currency === 'usd'
                    ? `$${chart?.coin?.market_cap.toLocaleString()}`
                    : chart?.currency === 'eur'
                    ? `€${chart?.coin?.market_cap.toLocaleString()}`
                    : `¥${chart?.coin?.market_cap.toLocaleString()}`}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chart;
