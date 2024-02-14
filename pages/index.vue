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
    :items="store.items"
    :toggleFavorite="store.toggleFavorite"
    :togglePlus="store.togglePlus"
  />
</template>

<script setup>
import { useMainStore } from "@/store/store";
const store = useMainStore();

const onChangeSelect = (e) => (store.filters.sortQuery = e.target.value);
const onChangeSearchInput = useDebounce(
  (e) => (store.filters.searchQuery = e.target.value),
  500
);

onMounted(async () => {
  await store.fetchItems();
});
</script>

<style>
.filters {
  padding-top: 30px;
}

.filters__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.filters h2 {
  flex: 1;
}

.search {
  position: relative;
}

.search,
.search input,
.sort,
.sort select {
  width: 100%;
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

@media (min-width: 480px) {
  .filters__wrapper {
    flex-wrap: nowrap;
  }

  .search,
  .sort {
    width: initial;
  }
}
</style>
