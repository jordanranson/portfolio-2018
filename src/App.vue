<template>
  <div id="app">
    <renderer :running="running">
      <layer>
        Hello, world
      </layer>
    </renderer>
  </div>
</template>

<script>
import Layer from './components/Layer.vue'
import Renderer from './components/Renderer.vue'

export default {
  name: 'app',

  components: {
    Layer,
    Renderer
  },

  data () {
    return {
      running: true
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
