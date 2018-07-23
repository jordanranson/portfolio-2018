<template>
  <div>
    <slot />
  </div>
</template>

<script>
import graphic from '@/mixins/graphic.js'

export default {
  name: 'Sprite',

  mixins: [ graphic ]
}
</script>
