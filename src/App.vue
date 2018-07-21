<template>
  <div id="app">
    <renderer :running="running">

      <!-- Hero -->
      <layer height="100%" padding="15" :background="colours.RED">
        <layer height="50%">
          <graphic-text :font="fonts.Superstar" :colour="colours.DARK_BLUE">
            JORDAN RANSON
          </graphic-text>
          <graphic-text :font="fonts.EightBitFortress" :colour="colours.DARK_BLUE">
            UI . Designer . Developer
          </graphic-text>
        </layer>
        <layer :height="7" :bottom="0" position="absolute" flow="horizontal">
          <graphic-text :font="fonts.EightBitFortress" :colour="colours.DARK_BLUE">UI</graphic-text>
          <graphic-text :font="fonts.EightBitFortress" :colour="colours.DARK_BLUE" :left="10">Games</graphic-text>
          <graphic-text :font="fonts.EightBitFortress" :colour="colours.DARK_BLUE" :left="20">Design</graphic-text>
          <graphic-text :font="fonts.EightBitFortress" :colour="colours.DARK_BLUE" :left="30">Projects</graphic-text>
        </layer>
        <layer :width="(9+5)*3" :height="9" :bottom="0" :right="0" position="absolute" flow="horizontal" :background="colours.DARK_BLUE">
        </layer>
      </layer>

      <!-- Strap 1 -->
      <layer height="100%" padding="15" :background="colours.DARK_BLUE">
        <graphic-text :font="fonts.Superstar" :colour="colours.WHITE">
          {{ "Hello, world." | toUpperCase }}
        </graphic-text>
        <graphic-text :font="fonts.EightBitFortress" :colour="colours.WHITE" padding="10 0 0 0">
          Hello, world.
          Lorem ipsum dolor sit amet.
          Foo, bar, baz.
        </graphic-text>
      </layer>

    </renderer>
  </div>
</template>

<script>
import Layer from './components/Layer.vue'
import Colours from './constants/colours.js'
import Renderer from './components/Renderer.vue'
import GraphicText from './components/GraphicText.vue'

// Fonts
import Superstar from './fonts/Superstar.js'
import EightBitFortress from './fonts/EightBitFortress.js'

console.log(EightBitFortress)

export default {
  name: 'app',

  components: {
    Layer,
    Renderer,
    GraphicText
  },

  data () {
    return {
      fonts: {
        Superstar,
        EightBitFortress
      },
      running: true
    }
  },

  computed: {
    colours () {
      return Colours
    }
  },

  filters: {
    toUpperCase (str) {
      return str.toUpperCase()
    }
  }
}
</script>

<style lang="sass">
  #app,
  html,
  body
    width: 100%
    height: 100vh
    margin: 0
    padding: 0
    overflow: hidden

  body
    color: #1D2B53
    background: #7E2553
    //background: #FF004D
</style>
