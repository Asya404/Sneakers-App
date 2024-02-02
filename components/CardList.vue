<template>
  <div class="cards">
    <div class="container">
      <Card
        title="Product title"
        imageUrl="/products/product-1.jpg"
        :price="5000"
        :onClickAdd="showAlert"
      />
    </div>
  </div>
</template>

<script setup>
const showAlert = () => {
  alert(555);
};
</script>

<style>
.cards {
  padding-bottom: 30px;
}

.cards .container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(204px, 1fr));
  gap: 15px;
}
</style>
