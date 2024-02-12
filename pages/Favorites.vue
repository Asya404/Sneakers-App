<template>
  <h1>My favorites</h1>
  <CardList
    :items="store.favorites"
    :toggleFavorite="store.toggleFavorite"
    :onAddPlus="store.onAddPlus"
  />
</template>

<script setup>
import { useMainStore } from "@/store/store";
const store = useMainStore();

onMounted(() => {
  store.fetchItems();
});
</script>
