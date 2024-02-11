<template>
  <Drawer
    v-if="drawerOpen"
    @closeDrawer="closeDrawer"
    :createOrder="createOrder"
    :totalPrice="totalPrice"
    :cart="cart"
  />

  <div class="wrapper">
    <Header :openDrawer="openDrawer" :totalPrice="totalPrice" />
    <div class="hero">
      <div class="container">
        <img src="/hero.png" alt="Hero" />
      </div>
    </div>

    <div class="filters">
      <div class="container">
        <h2>All products</h2>
        <div class="sort">
          <select @change="onChangeSelect">
            <option value="name">By name</option>
            <option value="price">From low to high</option>
            <option value="-price">From high to low</option>
          </select>
        </div>
        <div class="search">
          <img src="/search.svg" alt="Search" />
          <input
            @input="onChangeSearchInput"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>

    <CardList :items="items" />
  </div>
</template>

<script setup>
import { useMainStore } from "@/store/store";

const store = useMainStore();

const items = computed(() => store.items);
const cart = computed(() => store.cart);
const drawerOpen = computed(() => store.drawerOpen);
const totalPrice = computed(() => store.totalPrice);

const sortQuery = ref("");
const searchQuery = ref("");

const closeDrawer = () => (store.drawerOpen = false);
const openDrawer = () => (store.drawerOpen = true);

const onChangeSelect = (e) => (sortQuery.value = e.target.value);
const onChangeSearchInput = (e) => (searchQuery.value = e.target.value);

const addToFavorite = (item) => store.addToFavorite(item);
const onAddPlus = (item) => store.onAddPlus(item);
const removeFromDrawer = (cartItem) => store.removeFromDrawer(cartItem);
const createOrder = () => store.createOrder();

provide("addToFavorite", addToFavorite);
provide("onAddPlus", onAddPlus);
provide("removeFromDrawer", removeFromDrawer);

onMounted(() => {
  store.fetchItems();
});

watch(() => {
  store.fetchItems();
});
watch([sortQuery, searchQuery], () => {
  store.filters.sortQuery = sortQuery.value;
  store.filters.searchQuery = searchQuery.value;
  store.fetchItems();
});
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
}
</style>

<style scoped>
.wrapper {
  max-width: 960px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  margin: 55px auto;
}

.hero {
  margin-top: 30px;
}

.filters {
  padding: 30px 0;
}

.filters .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.filters h2 {
  font-size: 25px;
  font-weight: 700;
  flex: 1;
}

.search {
  position: relative;
}

.search input,
.sort select {
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  padding: 10px 8px 10px 35px;
  outline: none;
  transition: all 0.2s ease;
}

.search input:focus {
  border: 1px solid #9ca3af;
}

.search img {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.sort select {
  padding-left: 8px;
}
</style>
