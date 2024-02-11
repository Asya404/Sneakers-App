<template>
  <div class="cards">
    <div class="cards__wrapper" v-auto-animate>
      <Card
        v-for="item in items"
        :key="item.id"
        :item="item"
        :toggleFavorite="toggleFavorite"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: Array,
  toggleFavorite: Function,
});
</script>

<style>
.cards {
  margin-top: 10px;
}

.cards__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(204px, 1fr));
  gap: 15px;
}
</style>
