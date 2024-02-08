<template>
  <header>
    <div class="container">
      <div class="logo">
        <img src="/logo.png" alt="Logo" />
        <div>
          <h1>Vue Sneakers</h1>
          <p class="subtitle">The Ultimate Sneaker Spot</p>
        </div>
      </div>
      <ul>
        <li @click="openDrawer">
          <img src="/cart.svg" alt="Cart" />
          <span
            ><b>{{ totalPrice }} €</b></span
          >
        </li>
        <li>
          <img src="/heart.svg" alt="Heart" />
          <span>favs</span>
        </li>
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
  padding: 30px 0;
  border-bottom: 1px solid #cbd5e1;
}

header .container {
  display: flex;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
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
  gap: 10px;
  color: #6b7280;
  transition: all 0.3s ease;
  cursor: pointer;
}

ul li:hover {
  color: #000;
}
</style>
