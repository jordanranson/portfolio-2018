<template>
  <div>
    <slot />
  </div>
</template>

<script>
import graphic from '@/mixins/graphic.js'

export default {
  name: 'Layer',

  mixins: [ graphic ],

  computed: {
    isLayer () {
      return true
    }
  }
}
</script>
