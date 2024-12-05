import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useTaxas() {
  const [taxas, definirTaxas] = useState({ USD: null, EUR: null });
  const [carregando, definirCarregamento] = useState(true);

  async function atualizarTaxas() {
    definirCarregamento(true);
    try {
      const resposta = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL');
      definirTaxas({
        USD: resposta.data.USDBRL.ask,
        EUR: resposta.data.EURBRL.ask,
      });
    } catch (erro) {
      console.log('Erro ao buscar cotação:', erro);
    }
    definirCarregamento(false);
  }

  useEffect(() => {
    atualizarTaxas();
    const intervalo = setInterval(atualizarTaxas, 30000);
    return () => clearInterval(intervalo);
  }, []);

  return { taxas, carregando, atualizarTaxas };
}
