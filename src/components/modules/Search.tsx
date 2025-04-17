import React, { useState, useEffect } from 'react';

import { SearchProps } from '../../interfaces/interfaces';
import useDebounce from '../../hooks/useDebounce';
import { searchCoins } from '../../services/CryptoAPI';
import { SearchedCoin } from '../../interfaces/interfaces';
import Loader from './Loader';

import classes from './styles/Search.module.css';

const Search: React.FC<SearchProps> = ({ currency, setCurrency }) => {
  const [searchText, setSearchText] = useState('');
  const coinSearchTextDebounced = useDebounce(searchText, 1000);
  const [searchedCoins, setSearchedCoins] = useState<SearchedCoin[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (!searchText) {
      setSearchedCoins([]);
      return;
    }
  }, [searchText]);

  useEffect(() => {
    if (!coinSearchTextDebounced) {
      setSearchedCoins([]);
      return;
    }

    setIsLoading(true);
    fetch(searchCoins(coinSearchTextDebounced))
      .then((res) => res.json())
      .then((data) => {
        if (data.coins) {
          setSearchedCoins(data.coins);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [coinSearchTextDebounced]);

  return (
    <div className={classes.searchBox}>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={searchHandler}
        />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="jpy">JPY</option>
        </select>
      </div>
      {searchText && (
        <div className={classes.searchResults}>
          {isLoading ? (
            <div>
              <Loader />
            </div>
          ) : searchedCoins.length > 0 ? (
            <ul>
              {searchedCoins.map((coin) => (
                <li key={coin.id}>
                  <img src={coin.thumb} alt={coin.name} />
                  <p>{coin.name}</p>
                </li>
              ))}
            </ul>
          ) : (
            <Loader />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
