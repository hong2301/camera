<script setup lang="ts"></script>

<template>
  <div class="overture">
    <div class="head"></div>
    <div class="body">
      <router-view />
    </div>
    <div class="tail"></div>
  </div>
</template>

<style scoped>
.overture {
  width: 100vw;
  height: 100vh;
}
.head {
  width: 100%;
  height: 10%;
}
.body {
  width: 100%;
  height: 80%;
}
.tail {
  width: 100%;
  height: 10%;
}
</style>
