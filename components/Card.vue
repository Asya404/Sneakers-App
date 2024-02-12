<template>
  <div class="card">
    <img
      class="card__fav"
      :src="!item.isFavorite ? '/like-1.svg' : '/like-2.svg'"
      @click="() => toggleFavorite(item)"
      alt="Like"
    />
    <div class="card__img">
      <img class="card__img" :src="item.imageUrl" :alt="item.title" />
    </div>
    <p class="card__title">{{ item.title }}</p>
    <div class="card__footer">
      <div class="card__price">
        <span class="price">Price</span>
        <span
          ><b>{{ item.price }} €</b></span
        >
      </div>
      <img
        :src="!item.isAdded ? '/plus.svg' : '/checked.svg'"
        @click="onAddPlus(item)"
        alt="Checked"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
  toggleFavorite: Function,
  onAddPlus: Function,
});
</script>

<style scoped>
.cards {
  margin-top: 40px;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
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

.card__img img {
  height: 121px;
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
