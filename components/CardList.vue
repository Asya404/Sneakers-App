<template>
  <div class="cards">
    <div class="container">
      <Card
        v-for="item in items"
        :key="item.id"
        :item="item"
        :onClickFavorite="() => emit('addToFavorite', item)"
        :onClickAdd="() => emit('addToCart', item)"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: Array,
});

const emit = defineEmits(["addToFavorite", "addToCart"]);
</script>

<style>
.cards {
  padding-bottom: 30px;
  margin-top: 40px;
}

.cards .container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(204px, 1fr));
  gap: 15px;
}
</style>
