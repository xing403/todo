<script setup lang="ts">
defineProps<{
  task: TaskType
}>()
</script>

<template>
  <div>
    <div>{{ task.title }}</div>
  </div>
</template>
