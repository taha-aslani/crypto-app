const BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = 'CG-Bm89JGBmeSbKNZyjuu5MYMWk';

const getCoinsList = (page: number, currency: string): string =>
  `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_by_total_volume&per_page=20&page=${page}&sparkline=false&price_change_percentage=24h&locale=en&x_cg_demo_api_key=${API_KEY}`;

const searchCoins = (query: string): string =>
  `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`;

const marketChart = (coin: string): string =>
  `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7&x_cg_demo_api_key=${API_KEY}`;

export { getCoinsList, searchCoins, marketChart };
