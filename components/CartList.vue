<template>
  <div v-auto-animate class="cart-list">
    <CartItem
      v-for="product in cart"
      :key="product.id"
      :product="product"
      :removeFromDrawer="removeFromDrawer"
    />
  </div>
</template>

<script setup>
defineProps({
  cart: Array,
  removeFromDrawer: Function,
});
</script>

<style scoped>
.cart-list {
  flex: 1;
}
</style>
