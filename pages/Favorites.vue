<template>
  <h2>My favorites</h2>
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
