import { useState, useEffect } from 'react';

const useDebounce = (text: string, delay: number): string => {
  const [debounce, setDebounce] = useState(text);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(text);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [text, delay]);
  return debounce;
};

export default useDebounce;
