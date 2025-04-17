import { ReactNode, FC } from 'react';

import classes from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Crypto App</h1>
        <p>
          <a href="https://tahaaslani.ir" target="_blank">
            Taha Aslani
          </a>{' '}
          | React.js Exercise
        </p>
      </header>
      <main>{children}</main>
      <footer className={classes.footer}>
        Developed by{' '}
        <a href="https://tahaaslani.ir" target="_blank">
          Taha Aslani
        </a>{' '}
        with LOVE
      </footer>
    </>
  );
};

export default Layout;
