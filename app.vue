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
const items = ref([]);
const cart = ref([]);
const drawerOpen = ref(false);
const filters = reactive({ sortQuery: "", searchQuery: "" });

const closeDrawer = () => (drawerOpen.value = false);
const openDrawer = () => (drawerOpen.value = true);

const onChangeSelect = (e) => (filters.sortQuery = e.target.value);

const onChangeSearchInput = (e) => (filters.searchQuery = e.target.value);

const fetchItems = async () => {
  try {
    const params = reactive({});
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }
    if (filters.sortQuery) {
      params.sortBy = filters.sortQuery;
    }
    const { data } = await useFetch(
      "https://2fadb0c14f8b7015.mokky.dev/items",
      { params }
    );

    // get data from LS
    const favoritesLS = JSON.parse(localStorage.getItem("favorites")) || [];
    const addedItemsLS = JSON.parse(localStorage.getItem("cart")) || [];

    items.value = data.value.map((item) => {
      return {
        ...item,
        isFavorite: favoritesLS.some((fav) => fav.id === item.id),
        isAdded: addedItemsLS.some((fav) => fav.id === item.id),
      };
    });

    cart.value = addedItemsLS;
  } catch (error) {
    console.error(error);
  }
};

const addToFavorite = (item) => {
  item.isFavorite = !item.isFavorite;
};

const onAddPlus = (item) => {
  if (!item.isAdded) {
    cart.value.push(item);
    item.isAdded = true;
  } else {
    cart.value.splice(cart.value.indexOf(item), 1);
    item.isAdded = false;
  }
};

const removeFromDrawer = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
};

const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price, 0)
);

const createOrder = async () => {
  try {
    const { data } = await useFetch(
      "https://2fadb0c14f8b7015.mokky.dev/orders",
      {
        method: "POST",
        body: {
          items: cart.value,
          totalPrice: totalPrice.value,
        },
      }
    );
    cart.value = [];
    items.value.forEach((item) => (item.isAdded = false));
  } catch (error) {
    console.error(error);
  }
};

watch(
  items,
  () => {
    const favorites = items.value.filter((item) => item.isFavorite);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  },
  { deep: true }
);

watch(
  cart,
  () => {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  },
  { deep: true }
);

provide("onAddPlus", onAddPlus);
provide("removeFromDrawer", removeFromDrawer);
provide("addToFavorite", addToFavorite);

onMounted(async () => {
  await fetchItems();
});

watch(filters, () => {
  fetchItems();
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
