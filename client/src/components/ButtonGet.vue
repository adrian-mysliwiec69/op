<script setup>
const emit = defineEmits(['getEmployees']);
</script>

<template>
  <div>
    <button class="btn btn-outline-primary" @click="emit('getEmployees')">Get Employe</button>
  </div>
</template>
