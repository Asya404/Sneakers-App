<template>
  <div class="backdrop"></div>
  <div class="drawer">
    <div class="drawer__header">
      <img src="/arrow-next.svg" alt="Arrow" />
      <h2>Drawer</h2>
    </div>
    <CartList />
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #000;
  opacity: 0.7;
  z-index: 100;
}

.drawer {
  background-color: #fff;
  width: 400px;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 30px;
  z-index: 150;
}

.drawer__header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.drawer img {
  opacity: 0.3;
  cursor: pointer;
  transform: rotate(180deg);
  transition: all 0.3s ease;
}

.drawer img:hover {
  opacity: 1;
  transform: rotate(180deg) translateX(5px);
}

.drawer h2 {
  font-size: 20px;
  font-weight: 700;
}
</style>
