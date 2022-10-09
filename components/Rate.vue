<template>
  <div class="rate-usd">
    <div>Rate:</div>
    <div class="count">&#36;{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: 'Rate',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style>
.rate-usd {
  display: flex;
  height: 52px;
  justify-content: space-between;
  align-items: center;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  padding: 0.375rem 0.75rem;
}
</style>