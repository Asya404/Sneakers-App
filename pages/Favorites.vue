<template>
  <h1>My favorites</h1>
  <CardList
    :items="store.favorites"
    :toggleFavorite="store.toggleFavorite"
    :togglePlus="store.togglePlus"
  />
</template>

<script setup>
import { useMainStore } from "@/store/store";
const store = useMainStore();

onMounted(() => {
  store.fetchItems();
});
</script>
