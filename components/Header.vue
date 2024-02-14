<template>
  <header class="header">
    <div class="header__wrapper">
      <NuxtLink to="/">
        <div class="logo">
          <img src="/logo.png" alt="Logo" />
          <div>
            <h1>Vue Sneakers</h1>
            <p class="subtitle">The ultimate sneaker spot</p>
          </div>
        </div>
      </NuxtLink>
      <ul>
        <li @click="openDrawer">
          <img src="/cart.svg" alt="Cart" />
          <span>{{ totalPrice }} €</span>
        </li>
        <NuxtLink to="/favorites">
          <li>
            <img src="/heart.svg" alt="Heart" />
            <span>favs</span>
          </li>
        </NuxtLink>
        <li>
          <img src="/profile.svg" alt="Heart" />
          <span>profile</span>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
defineProps({
  totalPrice: Number,
  openDrawer: Function,
});
</script>

<style scoped>
header {
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #cbd5e1;
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
}

.logo img {
  width: 40px;
}

h1 {
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.subtitle {
  color: #9ca3af;
}

ul {
  display: flex;
  align-items: center;
  gap: 30px;
}

ul li {
  display: flex;
  gap: 7px;
  color: #6b7280;
  transition: all 0.3s ease;
  cursor: pointer;
}

ul li span {
  letter-spacing: 1px;
}

ul li:hover {
  color: #000;
}
</style>
