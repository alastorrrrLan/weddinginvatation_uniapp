<script>
export default {
  name: 'GuestTab',
  props: {
    hidden: Boolean
  }
}
</script>

<template>
  <div :style="hidden ? {display: 'none'} : ''">test</div>
</template>

<style scoped>

</style>
