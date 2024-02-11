import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore("main", () => {
  const items = ref([]);
  const cart = ref([]);
  const drawerOpen = ref(false);
  const favorites = ref([]);
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
      const { data } = await useFetch(
        "https://2fadb0c14f8b7015.mokky.dev/items",
        { params }
      );

      const favoritesLS = JSON.parse(localStorage.getItem("favorites")) || [];
      const addedItemsLS = JSON.parse(localStorage.getItem("cart")) || [];

      favorites.value = favoritesLS;

      items.value = data.value.map((item) => ({
        ...item,
        isFavorite: favoritesLS.some((fav) => fav.id === item.id),
        isAdded: addedItemsLS.some((addedItem) => addedItem.id === item.id),
      }));

      cart.value = addedItemsLS;
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

    updateFavorites();
  };

  const onAddPlus = (item) => {
    item.isAdded = !item.isAdded;

    items.value.forEach((i) => {
      if (item.id === i.id) {
        i.isAdded = item.isAdded;
      }
    });

    updateCart();
    updateFavorites();
  };

  const removeFromDrawer = (cartItem) => {
    cart.value.splice(cart.value.indexOf(cartItem), 1);
    cartItem.isAdded = false;

    // update isAdded for item in items
    const itemToUpdate = items.value.find((item) => item.id === cartItem.id);
    if (itemToUpdate) {
      itemToUpdate.isAdded = false;
    }

    updateFavorites();
    updateCart();
  };

  const updateFavorites = () => {
    favorites.value = items.value.filter((item) => item.isFavorite);
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  };

  const updateCart = () => {
    cart.value = items.value.filter((item) => item.isAdded);
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const createOrder = async () => {
    const body = {
      items: cart.value,
      totalPrice: totalPrice.value,
    };
    try {
      await useFetch("https://2fadb0c14f8b7015.mokky.dev/orders", {
        method: "POST",
        body,
      });
      cart.value = [];
      items.value.forEach((item) => (item.isAdded = false));
      localStorage.setItem("cart", "[]");
    } catch (error) {
      console.error(error);
    }
  };

  const totalPrice = computed(() => {
    return cart.value.reduce((acc, item) => acc + item.price, 0);
  });

  return {
    items,
    cart,
    drawerOpen,
    filters,
    fetchItems,
    toggleFavorite,
    onAddPlus,
    removeFromDrawer,
    createOrder,
    totalPrice,
    favorites,
  };
});
