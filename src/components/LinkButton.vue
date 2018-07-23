<template>
  <a :href="href" :target="target"><slot /></a>
</template>

<script>
import colours from '@/constants/colours.js'
import graphic from '@/mixins/graphic.js'
import graphicText from '@/mixins/graphicText.js'

export default {
  name: 'LinkButton',

  inject: [ 'state' ],

  mixins: [ graphic, graphicText ],

  props: {
    href: {
      type: String,
      default: '#'
    },
    target: {
      type: [ String, undefined ],
      default: undefined
    },
    padding: {
      type: [ Number, String ],
      default: '0 0 4 0'
    },
    colourHover: {
      type: String,
      default: colours.YELLOW
    }
  },

  methods: {
    // clear () {
    //   const { size } = this
    //   this.context.fillStyle = '#ccc'
    //
    //   for (let i = 0; i < 10; i++) {
    //     const x = Math.round(Math.random() * size.width)
    //     const y = Math.round(Math.random() * size.height)
    //     this.context.fillRect(x - 1, y, 1, 1)
    //     this.context.fillRect(x + 1, y, 1, 1)
    //     this.context.fillRect(x, y - 1, 1, 1)
    //     this.context.fillRect(x, y + 1, 1, 1)
    //   }
    //
    //   // this.context.fillRect(0, 0, size.width, size.height)
    // },

    draw (ofsx, ofsy) {
      const { x, y } = this.state.cursorPos
      const { size, state } = this

      const hoverx = (x >= ofsx && x <= ofsx + size.width)
      const hovery = (y >= ofsy && y <= ofsy + size.height)
      const hover = hoverx && hovery

      const colour = hover ? this.colourHover : this.colour

      if (hover) {
        state.cursor = 'pointer'

        if (state.cursorTapped) {
          
        }
      }

      // Drawing
      graphicText.methods.draw.call(this, ofsx, ofsy, colour)

      const { context, paddingSize } = this
      context.fillStyle = colour
      context.fillRect(0, size.height - 2, size.width - 2, 1)

      return this.canvas
    },
  }
}
</script>
