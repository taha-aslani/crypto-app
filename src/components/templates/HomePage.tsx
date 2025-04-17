import { useEffect, useState } from 'react';

import { Crypto, ChartData } from '../../interfaces/interfaces';
import TableCoin from '../modules/TableCoin';
import { getCoinsList } from '../../services/CryptoAPI';
import Pagination from '../modules/Pagination';
import Search from '../modules/Search';
import Chart from '../modules/Chart';

function HomePage() {
  const [coins, setCoins] = useState<Crypto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('usd');
  const [chart, setChart] = useState<ChartData | null>(null);
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(getCoinsList(page, currency))
      .then((res) => res.json())
      .then((json: Crypto[]) => {
        setCoins(json);
        setIsLoading(false);
      });
  }, [page, currency]);
  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin
        coins={coins}
        isLoading={isLoading}
        currency={currency}
        setChart={setChart}
        setChartLoading={setChartLoading}
      />
      <Pagination page={page} setPage={setPage} />
      {chartLoading ? (
        <Chart chart={chart} setChart={setChart} chartLoading={chartLoading} />
      ) : chart ? (
        <Chart chart={chart} setChart={setChart} chartLoading={chartLoading} />
      ) : null}
    </div>
  );
}

export default HomePage;
