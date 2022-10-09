import axios from 'axios';

export const getCurrencyRate = async ({ from, to }) => {
  try {
    const { data: response } = await axios.post('https://dev-api.finteria.com/api/calculator/exchange/calculate', {
      currency_from: from,
      currency_to: to,
    });
    const { conversion_rate, conversion_rate_usd } = response.data;
    return {
      rate: +conversion_rate,
      rateUSD: +conversion_rate_usd
    };
  } catch (error) {
    return new Error(error.message);
  }
}