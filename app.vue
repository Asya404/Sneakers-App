<template>
  <!-- <Drawer /> -->
  <div class="wrapper">
    <Header />
    <div class="heading">
      <div class="container">
        <h2>All products</h2>
      </div>
    </div>
    <CardList />
  </div>
</template>

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

h2 {
  font-size: 25px;
  font-weight: 700;
}

.heading {
  padding: 30px 0;
}
</style>
