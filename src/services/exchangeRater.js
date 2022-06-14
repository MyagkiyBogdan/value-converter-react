const BASE_URL = `https://v6.exchangerate-api.com/v6/6cbbba97b763887effc4b36c/latest/USD`;

export default async function getExchangeRate() {
  const response = await fetch(BASE_URL);

  const rate = await response.json();
  return rate;
}
