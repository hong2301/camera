<script setup lang="ts">
let btn = 1
const rotateFn =async (data: { dir: number; degree: number }) => {
  if (btn) {
    btn = 0
    await window.api.electrical_machinery.test(data)
    setTimeout(() => {
      btn = 1
    }, 0)
  }
}
</script>

<template>
  <div class="content">
    <button class="btn" @click="rotateFn({ dir: 1, degree: 90 })">上</button>
    <button class="btn" @click="rotateFn({ dir: 0, degree: 90 })">下</button>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn {
  width: 500px;
  height: 300px;
  font-size: 5rem;
  margin: 30px;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn:active {
  transform: scale(1.1);
}
</style>
