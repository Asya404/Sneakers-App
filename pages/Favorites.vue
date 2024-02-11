<template>
  <h1>My favorites</h1>
  <CardList
    :items="favorites"
    :toggleFavorite="store.toggleItemFavorite"
    :onAddPlus="store.onAddPlusFavorites"
  />
</template>

<script setup>
import { useMainStore } from "@/store/store";
const store = useMainStore();

const favorites = computed(() => store.favorites);

watch(() => {
  store.fetchItems();
});
onMounted(() => {
  store.fetchItems();
});
</script>
