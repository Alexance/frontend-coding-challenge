<template>
  <div class="home-container">
    <h2>Is your name lucky?</h2>

    <p>
      Welcome to the game where we find out whether your name is one of our
      lucky names of the day. All you have to do is type your name below and we
      will tell you!
    </p>

    <div class="game-container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// @NOTE: all the styles should be combined together as much as possible
// to avoid duplicates and potential overlaps. The best option here is
// to have a dedicated design system with its representation in UI Kit
// to keep the styles and separated from logic (it can use Element Plus behind) -
// it's just modified version that fits a product requirements
.home-container {
  width: 50vw;
  display: grid;
  justify-items: center;
}

.game-container {
  width: 50%;
}
</style>
