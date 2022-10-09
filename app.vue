<template>
  <header>
    <Header />
  </header>
  <main>
    <div class="blur" />
    <Main />
  </main>
</template>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
header {
  height: calc(60px + 2rem);
}
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px - 2rem);
  background-image: url('./assets/background.jpg');
  position: relative;
}
main .blur {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
}
</style>