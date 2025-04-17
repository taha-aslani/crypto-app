import React from 'react';

export interface ROI {
  times: number;
  currency: string;
  percentage: number;
}

export interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: ROI | null | unknown;
  last_updated: string;
}

export interface SearchProps {
  currency: string;
  setCurrency: (currency: string) => void;
}

export type ChartNumber = [number, number];

export interface ChartData {
  prices: ChartNumber[];
  market_caps: ChartNumber[];
  total_volumes: ChartNumber[];
  coin?: Crypto;
  currency: string;
}

export interface TableCoinProps {
  coins: Crypto[];
  isLoading: boolean;
  currency: string;
  setChart: React.Dispatch<React.SetStateAction<ChartData | null>>;
  setChartLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TableRowProps {
  coin: Crypto;
  currency: string;
  setChart: React.Dispatch<React.SetStateAction<ChartData | null>>;
  setChartLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface SearchedCoin {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export interface ChartProps {
  chart: ChartData | null;
  setChart?: React.Dispatch<React.SetStateAction<ChartData | null>>;
  chartLoading: boolean;
}
