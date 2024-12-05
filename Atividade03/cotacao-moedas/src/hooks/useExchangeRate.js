import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useExchangeRate() {
  const [exchangeRate, setExchangeRate] = useState({ USD: null, EUR: null });
  const [loading, setLoading] = useState(true);

  async function fetchExchangeRate() {
    setLoading(true);
    try {
      const response = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL');
      const { USDBRL, EURBRL } = response.data;
      setExchangeRate({
        USD: USDBRL.ask,
        EUR: EURBRL.ask,
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 30000);
    return () => clearInterval(interval);
  }, []);

  return { exchangeRate, loading, fetchExchangeRate };
}
