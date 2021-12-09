<template>
  <div class="demo-progress">
    <el-progress :percentage="50" />
    <el-progress :percentage="100" :format="format" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const format = (percentage) =>
      percentage === 100 ? 'Ready' : `${percentage}%`
    return {
      format,
    }
  },
})
</script>