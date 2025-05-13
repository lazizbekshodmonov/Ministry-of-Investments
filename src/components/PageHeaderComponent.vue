<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <a-flex class="w-full p-4" justify="space-between">
    <h1 class="text-2xl font-medium">{{ title }}</h1>
    <a-space>
      <slot name="actions" />
    </a-space>
  </a-flex>
</template>

<style scoped></style>
