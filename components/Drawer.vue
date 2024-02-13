<template>
  <div class="backdrop" @click="closeDrawer"></div>
  <div class="drawer">
    <div class="drawer__header">
      <NuxtImg src="/arrow-next.svg" alt="Arrow" @click="closeDrawer" />
      <h2>Drawer</h2>
    </div>

    <infoBlock
      v-if="cart.length === 0 && !isOrdered"
      title="Your cart is empty"
      description="Go shopping"
      imageUrl="/package-icon.png"
    />

    <infoBlock
      v-if="isOrdered"
      title="Order is ready"
      :description="`Your order #${orderId} will be delivered soon`"
      imageUrl="/order-success-icon.png"
    />

    <div v-if="cart.length > 0">
      <CartList :cart="cart" :removeFromDrawer="removeFromDrawer" />

      <div class="drawer__footer">
        <div class="drawer__summary">
          <span>Summary:</span>
          <div></div>
          <b>{{ totalPrice }} €</b>
        </div>
        <div class="drawer__fee">
          <span>Delivery:</span>
          <div></div>
          <b>10 €</b>
        </div>
        <button :disabled="cart.length === 0" @click="createOrder">
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cart: Array,
  totalPrice: Number,
  closeDrawer: Function,
});

const isOrdered = ref(false);
const orderId = ref(null);

import { useMainStore } from "@/store/store";
const store = useMainStore();

const removeFromDrawer = (cartItem) => {
  store.cart.splice(store.cart.indexOf(cartItem), 1);
  cartItem.isAdded = false;

  const itemToUpdate = store.items.find((item) => item.id === cartItem.id);
  if (itemToUpdate) {
    itemToUpdate.isAdded = false;
  }
};

const createOrder = async () => {
  const body = {
    items: store.cart,
    totalPrice: store.totalPrice,
  };
  try {
    const data = await $fetch("https://2fadb0c14f8b7015.mokky.dev/orders", {
      method: "POST",
      body,
    });
    orderId.value = data.id;
    isOrdered.value = true;
    store.cart = [];
    store.items.forEach((item) => (item.isAdded = false));
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #000;
  opacity: 0.7;
  z-index: 100;
}

.drawer {
  background-color: #fff;
  width: 400px;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 30px;
  z-index: 150;
  display: flex;
  flex-direction: column;
}

.drawer__header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.drawer img {
  width: 16px;
  opacity: 0.3;
  cursor: pointer;
  transform: rotate(180deg);
  transition: all 0.3s ease;
}

.drawer img:hover {
  opacity: 1;
  transform: rotate(180deg) translateX(5px);
}

.drawer h2 {
  font-size: 20px;
  font-weight: 700;
}

.drawer__footer {
  margin-top: 30px;
}

.drawer__summary,
.drawer__fee {
  display: flex;
  justify-content: space-between;
}

.drawer__summary {
  margin-bottom: 15px;
}

.drawer button {
  background-color: #84cc16;
  color: #fff;
  width: 100%;
  border-radius: 10px;
  padding: 15px 0;
  margin-top: 30px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.drawer button:hover {
  background-color: #65a30d;
}

.drawer button:active {
  background-color: #4d7c0f;
}

.drawer button:disabled {
  background-color: #cbd5e1;
}
</style>
