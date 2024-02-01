<template>
  <header>
    <div class="logo">
      <img src="/logo.png" alt="Logo" />
      <div>
        <h1>Headline</h1>
        <p class="subtitle">Subtitle</p>
      </div>
    </div>
    <ul>
      <li>
        <img src="/cart.svg" alt="Cart" />
        <span><b>amount</b></span>
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
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cbd5e1;
  padding: 30px 40px;
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
  fweight: 700;
  text-transform: uppercase;
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
