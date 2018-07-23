<template>
  <span><slot /></span>
</template>

<script>
import graphic from '@/mixins/graphic.js'
import graphicText from '@/mixins/graphicText.js'

export default {
  name: 'GraphicText',

  mixins: [ graphic, graphicText ]
}
</script>
