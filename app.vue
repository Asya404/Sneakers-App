<template>
  <!-- <Drawer /> -->
  <div class="wrapper">
    <Header />
    <div class="filters">
      <div class="container">
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
          <input type="text" placeholder="Search..." />
        </div>
      </div>
    </div>
    <CardList :items="items" />
  </div>
</template>

<script setup>
const items = ref([]);

const onChangeSelect = async (e) => {
  const { data } = await useFetch(
    `https://2fadb0c14f8b7015.mokky.dev/items?sortBy=${e.target.value}`
  );
  items.value = data.value;
};

onMounted(async () => {
  const { data } = await useFetch("https://2fadb0c14f8b7015.mokky.dev/items");
  items.value = data.value;
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f7fee7;
  font-family: "Inter", sans-serif;
  font-size: 14px;
}

img {
  max-width: 100%;
}

button,
a {
  all: unset;
}

.container {
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
}
</style>

<style scoped>
.wrapper {
  max-width: 960px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  margin-top: 55px;
}

.filters {
  padding: 30px 0;
}

.filters .container {
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
