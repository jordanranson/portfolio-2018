<template>
  <div id="app">
    <renderer :running="running">
      <layer padding="10" height="100%">
        <!-- <layer background="blue" padding="10" height="auto">
          <layer flow="horizontal">
            <layer background="yellow" width="50%"></layer>
            <layer background="magenta" width="50%"></layer>
          </layer>
          <layer height="auto" padding="16 0">
            <layer background="red"></layer>
            <layer background="lime"></layer>
          </layer>
          <layer background="green" :right="0" :bottom="0" position="absolute" width="48" height="48">
            <layer flow="horizontal" padding="24 4 4 4" height="auto">
              <layer background="yellow" width="50%" height="auto"></layer>
              <layer background="magenta" width="50%" height="auto"></layer>
              <layer background="black" position="absolute" width="10" height="10">
              </layer>
            </layer>
          </layer>
        </layer> -->
      </layer>
      <layer :background="colours.DARK_BLUE" height="100%" padding="15">
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
