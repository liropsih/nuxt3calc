import { getCurrencyRate } from '~~/api';

const currencies = {
  btc: 'BTC',
  eth: 'ETH' ,
  usd: 'USD',
  eur: 'EUR',
};

const currenciesEntries = Object.entries(currencies).map(([key, value]) => ({ key, value }));

const fee = 0.01;

function useCurrencyItem(cur) {
  const currency = ref(cur);
  const count = ref(0);
  const invalid = computed(() => typeof count.value !== 'number' || isNaN(count.value) || count.value < 0);
  const currencyItem = reactive({
    currency,
    count,
    invalid,
  });
  return currencyItem;
}

function useCurrencyRate() {
  const currencyRate = reactive({
    rate: ref(0),
    rateUSD: ref(0),
  });
  return currencyRate;
}

export function useCurrencies() {
  const from = useCurrencyItem(currenciesEntries.at(-1).key);
  const to = useCurrencyItem(currenciesEntries[0].key);
  const currencyRate = useCurrencyRate();
  const updateCurrencyRate = async () => {
    let { rate, rateUSD } = await getCurrencyRate({ from: from.currency, to: to.currency })
    rate -= rate * fee;
    rateUSD -= rateUSD * fee;
    if (from.count) {
      const usdCount = from.count * currencyRate.rateUSD;
      from.count = usdCount / rateUSD;
      to.count = from.count * rate;
    }
    currencyRate.rate = rate;
    currencyRate.rateUSD = rateUSD;
  };
  watch(() => [from.currency, to.currency], ([fromNext, toNext], [fromPrev, toPrev]) => {
    if (fromNext === fromPrev && toNext === toPrev) return;
    updateCurrencyRate();
  });
  updateCurrencyRate();
  const rateUSD = computed(() => {
    if (from.invalid || to.invalid) return 0;
    const rate = currencyRate.rateUSD * from.count;
    return +rate.toFixed(2);
  });
  const onFromCountChange = () => {
    if (from.invalid) {
      to.count = 0;
      return;
    }
    to.count = from.count * currencyRate.rate;
  };
  const onToCountChange = () => {
    if (to.invalid) {
      from.count = 0;
      return;
    }
    from.count = to.count / currencyRate.rate;
  };
  return {
    from,
    to,
    currencies: currenciesEntries,
    rateUSD,
    onFromCountChange,
    onToCountChange,
  };
}