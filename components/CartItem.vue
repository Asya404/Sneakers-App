<template>
  <div class="cart">
    <img class="cart__img" :src="product.imageUrl" :alt="product.title" />
    <div class="cart__text">
      <p>{{ product.title }}</p>
      <p class="cart__price">{{ product.price }} €</p>
    </div>
    <img
      @click="removeFromDrawer(product)"
      class="cart__close"
      src="/close.svg"
      alt="Close"
    />
  </div>
</template>

<script setup>
defineProps({
  product: Object,
  removeFromDrawer: Function,
});
</script>

<style scoped>
.cart {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  border: 1px solid #f1f5f9;
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 15px;
}

.cart__img {
  height: 70px;
}

.cart__price {
  font-weight: 700;
  margin-top: 5px;
}

.cart__close {
  opacity: 0.4;
  transition: all 0.3s ease;
  cursor: pointer;
}

.cart__close:hover {
  opacity: 1;
}
</style>
