import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore("main", () => {
  const items = ref([]);
  const cart = ref([]);
  const drawerOpen = ref(false);
  const favorites = ref([]);
  let fetchCompleted = false;
  const filters = reactive({
    sortQuery: "",
    searchQuery: "",
  });

  const fetchItems = async () => {
    const params = reactive({});
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }
    if (filters.sortQuery) {
      params.sortBy = filters.sortQuery;
    }

    try {
      const data = await $fetch("https://2fadb0c14f8b7015.mokky.dev/items", {
        params,
      });

      const favoritesLS = JSON.parse(localStorage.getItem("favorites")) || [];
      const addedItemsLS = JSON.parse(localStorage.getItem("cart")) || [];

      favorites.value = favoritesLS;

      items.value =
        data.map((item) => ({
          ...item,
          isFavorite: favoritesLS.some((fav) => fav.id === item.id),
          isAdded: addedItemsLS.some((addedItem) => addedItem.id === item.id),
        })) || [];

      cart.value = addedItemsLS;
      fetchCompleted = true;
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = (item) => {
    item.isFavorite = !item.isFavorite;

    items.value.forEach((i) => {
      if (item.id === i.id) {
        i.isFavorite = item.isFavorite;
      }
    });
  };

  const togglePlus = (item) => {
    item.isAdded = !item.isAdded;

    items.value.forEach((i) => {
      if (item.id === i.id) {
        i.isAdded = item.isAdded;
      }
    });
  };

  const totalPrice = computed(() => {
    return cart.value.reduce((acc, item) => acc + item.price, 0);
  });

  const openDrawer = () => {
    drawerOpen.value = true;
  };

  const closeDrawer = () => {
    drawerOpen.value = false;
  };

  const updateItems = () => {
    favorites.value = items.value.filter((item) => item.isFavorite);
    cart.value = items.value.filter((item) => item.isAdded);

    localStorage.setItem("favorites", JSON.stringify(favorites.value));
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  watch(
    filters,
    () => {
      fetchItems();
    },
    { deep: true }
  );

  watch(
    items,
    () => {
      if (fetchCompleted) {
        updateItems();
      }
    },
    { deep: true }
  );

  return {
    items,
    cart,
    drawerOpen,
    filters,
    fetchItems,
    toggleFavorite,
    togglePlus,
    totalPrice,
    favorites,
    openDrawer,
    closeDrawer,
  };
});
