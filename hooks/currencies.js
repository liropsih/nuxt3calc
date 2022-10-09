import { getCurrencyRate } from '~~/api';

const currencies = {
  btc: 'BTC',
  eth: 'ETH' ,
  usd: 'USD',
  eur: 'EUR',
};

const currenciesEntries = Object.entries(currencies).map(([key, value]) => ({ key, value }));

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
    const { rate, rateUSD } = await getCurrencyRate({ from: from.currency, to: to.currency })
    currencyRate.rate = rate;
    currencyRate.rateUSD = rateUSD;
  };
  watch(() => [from.currency, to.currency], ([from, to], [fromPrev, toPrev]) => {
    if (from === fromPrev && to === toPrev) return;
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