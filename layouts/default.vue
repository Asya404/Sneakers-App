<template>
  <Drawer
    v-if="drawerOpen"
    @closeDrawer="closeDrawer"
    :createOrder="createOrder"
    :totalPrice="totalPrice"
    :cart="cart"
  />

  <div class="wrapper">
    <div class="container">
      <Header :openDrawer="openDrawer" :totalPrice="totalPrice" />
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "@/store/store";
const store = useMainStore();

const cart = computed(() => store.cart);
const drawerOpen = computed(() => store.drawerOpen);
const totalPrice = computed(() => store.totalPrice);

const closeDrawer = () => (store.drawerOpen = false);
const openDrawer = () => (store.drawerOpen = true);
const createOrder = () => store.createOrder();
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f7fee7;
  font-family: "Inter", sans-serif;
  font-size: 14px;
}

img {
  max-width: 100%;
}

button,
a {
  all: unset;
}

.container {
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  padding: 30px 0;
}

.wrapper {
  max-width: 960px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  margin: 55px auto;
}
</style>
