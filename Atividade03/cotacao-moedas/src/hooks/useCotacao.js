import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCotacao() {
  const [cotacao, setCotacao] = useState({ USD: null, EUR: null });
  const [loading, setLoading] = useState(true);

  async function fetchCotacao() {
    setLoading(true);
    try {
      const response = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL');
      const { USDBRL, EURBRL } = response.data;
      setCotacao({
        USD: USDBRL.ask,
        EUR: EURBRL.ask,
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCotacao();
    const interval = setInterval(fetchCotacao, 30000);
    return () => clearInterval(interval);
  }, []);

  return { cotacao, loading, fetchCotacao };
}
