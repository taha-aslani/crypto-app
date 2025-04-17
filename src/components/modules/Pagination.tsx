import React from 'react';

import classes from './styles/Pagination.module.css';
import { PaginationProps } from '../../interfaces/interfaces';

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
  const previousHandler = () => {
    if (page <= 1) return;
    setPage((p) => p - 1);
  };
  const nextHandler = () => {
    if (page >= 10) return;
    setPage((p) => p + 1);
  };

  return (
    <div className={classes.pagination}>
      <button
        onClick={previousHandler}
        className={page === 1 ? classes.disabled : ''}
      >
        previous
      </button>
      <p
        className={page === 1 ? classes.selected : ''}
        onClick={() => setPage(1)}
      >
        1
      </p>
      <p
        className={page === 2 ? classes.selected : ''}
        onClick={() => setPage(2)}
      >
        2
      </p>
      {page > 2 && page < 9 && (
        <>
          <span>...</span>
          <p className={classes.selected}>{page}</p>
        </>
      )}
      <span>...</span>
      <p
        className={page === 9 ? classes.selected : ''}
        onClick={() => setPage(9)}
      >
        9
      </p>
      <p
        className={page === 10 ? classes.selected : ''}
        onClick={() => setPage(10)}
      >
        10
      </p>
      <button
        onClick={nextHandler}
        className={page === 10 ? classes.disabled : ''}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
