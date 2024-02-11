<template>
  <div class="hero">
    <img src="/hero.png" alt="Hero" />
  </div>

  <div class="filters">
    <div class="filters__wrapper">
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

  <CardList
    :items="items"
    :toggleFavorite="store.toggleFavorite"
    :onAddPlus="store.onAddPlus"
  />
</template>

<script setup>
import { useMainStore } from "@/store/store";
const store = useMainStore();

const items = computed(() => store.items);
const sortQuery = ref("");
const searchQuery = ref("");

const onChangeSelect = (e) => (sortQuery.value = e.target.value);
const onChangeSearchInput = (e) => (searchQuery.value = e.target.value);

onMounted(() => {
  store.fetchItems();
});

watch(() => {
  store.fetchItems();
});

watch([sortQuery, searchQuery], () => {
  store.filters.sortQuery = sortQuery.value;
  store.filters.searchQuery = searchQuery.value;
  store.fetchItems();
});
</script>

<style>
.filters {
  padding: 30px 0;
}

.filters__wrapper {
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
