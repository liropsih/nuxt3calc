<template>
  <div class="card">
    <div class="currency-calc">
      <div class="mb-5">
        <CurrencyItem
          v-model:currency="from.currency"
          v-model:count="from.count"
          label="Amount i have"
          :currencies="currencies.filter((c) => c.key !== to.currency)"
          :invalid="from.invalid"
          @count-change="onFromCountChange"
        />
        <CurrencyItem
          v-model:currency="to.currency"
          v-model:count="to.count"
          label="I need"
          :currencies="currencies.filter((c) => c.key !== from.currency)"
          :invalid="to.invalid"
          @count-change="onToCountChange"
        />
      </div>
      <Rate :value="rateUSD" />
    </div>
  </div>
</template>

<script>
import { useCurrencies } from '~~/hooks/currencies';

export default {
  name: 'Main',
  setup() {
    const { from, to, currencies, rateUSD, onFromCountChange, onToCountChange } = useCurrencies();
    return { from, to, currencies, rateUSD, onFromCountChange, onToCountChange };
  },
};
</script>

<style>
.card {
  width: 600px;
  height: auto;
  padding: 30px;
  box-shadow: rgb(65 68 71 / 80%) 0px 8px 24px;
}
</style>