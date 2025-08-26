<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(async () => {
  const response = await window.api.electrical_machinery.test('123')
  console.log(response) // prints out 'pong'
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
