<template>
  <div id="app">
    <renderer :running="running">

      <!-- Hero -->
      <layer height="100%" padding="15" :background="colours.RED">
        <layer height="50%">
          <graphic-text :font="fonts.Superstar" :colour="colours.DARK_BLUE">
            JORDAN RANSON
          </graphic-text>
          <graphic-text :font="fonts.EightBitFortress" :colour="colours.DARK_BLUE" :top="3">
            UI . Designer . Developer
          </graphic-text>
        </layer>
        <layer :height="10" :bottom="0" position="absolute" flow="horizontal">
          <link-button :font="fonts.EightBitFortress" :colour="colours.DARK_BLUE">UI</link-button>
          <link-button :font="fonts.EightBitFortress" :colour="colours.DARK_BLUE" :left="5">Games</link-button>
          <link-button :font="fonts.EightBitFortress" :colour="colours.DARK_BLUE" :left="10">Design</link-button>
          <link-button :font="fonts.EightBitFortress" :colour="colours.DARK_BLUE" :left="15">Projects</link-button>
        </layer>
        <layer :width="(9+5)*3" :height="10" :bottom="0" :right="0" position="absolute" flow="horizontal" :background="colours.DARK_BLUE">
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
import LinkButton from './components/LinkButton.vue'
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
    LinkButton,
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
