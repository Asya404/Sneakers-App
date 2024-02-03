<template>
  <div class="backdrop"></div>
  <div class="drawer">
    <div class="drawer__header">
      <img src="/arrow-next.svg" alt="Arrow" />
      <h2>Drawer</h2>
    </div>

    <CartList />

    <div class="drawer__footer">
      <div class="drawer__summary">
        <span>Summary:</span>
        <div></div>
        <b>13000</b>
      </div>
      <div class="drawer__fee">
        <span>Fee:</span>
        <div></div>
        <b>300</b>
      </div>
      <button>Checkout</button>
    </div>
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
  display: flex;
  flex-direction: column;
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

.drawer__footer {
  margin-top: 30px;
}

.drawer__summary,
.drawer__fee {
  display: flex;
  justify-content: space-between;
}

.drawer__summary {
  margin-bottom: 15px;
}

.drawer button {
  background-color: #84cc16;
  color: #fff;
  width: 100%;
  border-radius: 10px;
  padding: 15px 0;
  margin-top: 30px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.drawer button:hover {
  background-color: #65a30d;
}

.drawer button:active {
  background-color: #4d7c0f;
}

.drawer button:disabled {
  background-color: #cbd5e1;
}
</style>
