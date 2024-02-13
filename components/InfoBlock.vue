<template>
  <div class="info">
    <NuxtImg class="info__img" :src="imageUrl" alt="Info image" />
    <h2 class="info__title">{{ title }}</h2>
    <p class="info__description">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String,
});
</script>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 280px;
  margin: 0 auto;
}

.info__img {
  height: 80px;
  margin-bottom: 15px;
}

.info__title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.info__description {
  color: #9ca3af;
}
</style>
