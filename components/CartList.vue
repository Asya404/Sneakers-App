<template>
  <div class="cart-list">
    <CartItem v-for="product in cart" :key="product.id" :product="product" />
  </div>
</template>

<script setup>
defineProps({
  cart: Array,
});
</script>

<style scoped>
.cart-list {
  flex: 1;
}
</style>
