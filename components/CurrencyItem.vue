<template>
  <div class="currency-item">
    <label v-if="label" class="form-label">{{ label }}</label>
    <div class="input-group has-validation mb-3">
      <div class="input-group-text">
        <select class="form-select" v-model="Currency">
          <option v-for="currency in currencies" :value="currency.key">{{ currency.value }}</option>
        </select> 
      </div>
      <input
        type="number"
        min="0"
        class="form-control"
        v-model="Count"
        :class="{ 'is-invalid': invalid }"
        @input="onCountChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrencyItem',
  props: {
    currency: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    currencies: {
      type: Array,
      required: true,
    },
    invalid: {
      type: Boolean,
    },
    label: {
      type: String,
    },
  },
  emits: ['update:currency', 'update:count', 'count-change'],
  setup(props, { emit }) {
    const Currency = computed({
      get() {
        return props.currency;
      },
      set(value) {
        emit('update:currency', value);
      },
    });
    const Count = computed({
      get() {
        return props.count;
      },
      set(value) {
        emit('update:count', +value);
      },
    });
    const onCountChange = () => {
      emit('count-change');
    };
    return { Currency, Count, onCountChange };
  },
};
</script>

<style>
.currency-item .input-group-text {
  border-radius: 0.25rem 0 0 0.25rem;
}
</style>