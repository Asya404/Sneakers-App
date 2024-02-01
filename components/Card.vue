<template>
  <div class="card">
    <img class="card__fav" src="/like-1.svg" alt="Like 1" />
    <img :src="imageUrl" alt="Product" />
    <p class="card__title">{{ title }}</p>
    <div class="card__footer">
      <div class="card__price">
        <span class="price">Price</span>
        <span
          ><b>{{ price }}</b></span
        >
      </div>
      <img src="/plus.svg" alt="Plus" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
});
</script>

<style scoped>
.cards {
  margin-top: 40px;
}

.card {
  position: relative;
  background-color: #fff;
  border: 1px solid #f1f5f9;
  border-radius: 25px;
  padding: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translate(0, -10px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.card__fav {
  position: absolute;
  top: 30px;
  left: 30px;
}

.card__title {
  margin-top: 10px;
}

.card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.card__price {
  display: flex;
  flex-direction: column;
}

.card__price .price {
  color: #9ca3af;
}
</style>
