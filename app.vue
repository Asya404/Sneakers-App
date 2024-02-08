<template>
  <Drawer v-if="drawerOpen" @closeDrawer="closeDrawer" :cart="cart" />
  <div class="wrapper">
    <Header @openDrawer="openDrawer" />
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

const fetchFavorites = async () => {
  try {
    const { data } = await useFetch(
      "https://2fadb0c14f8b7015.mokky.dev/favorites"
    );

    // update existing items with favorite property if it exists in favorites or return original item
    items.value = items.value.map((item) => {
      const favorite = data.value.find((fav) => fav.sneakerId === item.id);

      if (!favorite) {
        return item;
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      };
    });
  } catch (error) {
    console.error(error);
  }
};

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
    items.value = data.value;
  } catch (error) {
    console.error(error);
  }
};

const addToFavorite = async (item) => {
  try {
    // if it wasn't added before post fav to db, update frontend (add id and isFav here)
    // else if was added before, delete fav by id from db, update frontend (added id and isFav when fetch)

    if (!item.isFavorite) {
      item.isFavorite = true;

      const { data } = await useFetch(
        "https://2fadb0c14f8b7015.mokky.dev/favorites",
        {
          method: "POST",
          body: {
            sneakerId: item.id,
          },
        }
      );

      item.favoriteId = data.sneakerId;
    } else {
      item.isFavorite = false;
      const { data } = await useFetch(
        `https://2fadb0c14f8b7015.mokky.dev/favorites/${item.favoriteId}`,
        {
          method: "DELETE",
        }
      );
    }
    console.log(item);
  } catch (error) {
    console.log(error);
  }
};

const onAddPlus = (item) => {
  if (!item.isAdded) {
    cart.value.push(item);
    item.isAdded = true;
  } else {
    cart.value.splice(cart.value.indexOf(item), 1);
    item.isAdded = false;
  }
  console.log(cart.value);
};

const removeFromDrawer = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
};

provide("onAddPlus", onAddPlus);
provide("removeFromDrawer", removeFromDrawer);
provide("addToFavorite", addToFavorite);

onMounted(async () => {
  await fetchItems();
  await fetchFavorites();
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
