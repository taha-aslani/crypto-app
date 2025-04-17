import React from 'react';

import {
  TableRowProps,
  TableCoinProps,
  ChartData,
} from '../../interfaces/interfaces';
import { marketChart } from '../../services/CryptoAPI';
import chartUp from '../../assets/chart-up.svg';
import chartDown from '../../assets/chart-down.svg';
import Loader from './Loader';

import classes from './styles/TableCoin.module.css';

const TableRow: React.FC<TableRowProps> = ({
  coin,
  currency,
  setChart,
  setChartLoading,
}) => {
  const {
    name,
    image,
    symbol,
    current_price,
    price_change_percentage_24h,
    total_volume,
    id,
  } = coin;
  const showHandler = () => {
    setChartLoading(true);
    fetch(marketChart(id))
      .then((res) => res.json())
      .then((data: ChartData) => {
        setChart({ ...data, coin, currency });
        setChartLoading(false);
      });
  };

  return (
    <tr>
      <td>
        <div className={classes.symbol} onClick={showHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currency === 'usd'
          ? `$${current_price.toLocaleString()}`
          : currency === 'eur'
          ? `€${current_price.toLocaleString()}`
          : `¥${current_price.toLocaleString()}`}
      </td>
      <td
        className={
          +price_change_percentage_24h > 0 ? classes.success : classes.error
        }
      >
        {price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img
          src={+price_change_percentage_24h > 0 ? chartUp : chartDown}
          alt="chart"
        />
      </td>
    </tr>
  );
};

const TableCoin: React.FC<TableCoinProps> = ({
  coins,
  isLoading,
  currency,
  setChart,
  setChartLoading,
}) => {
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Name</th>
            <th>Price</th>
            <th>24H</th>
            <th>Total Volume</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6} className={classes.loaderCell}>
                <div className={classes.loaderWrapper}>
                  <Loader />
                </div>
              </td>
            </tr>
          ) : (
            coins.map((coin) => (
              <TableRow
                coin={coin}
                key={coin.id}
                currency={currency}
                setChart={setChart}
                setChartLoading={setChartLoading}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableCoin;
