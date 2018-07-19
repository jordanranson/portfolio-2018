<template>
  <div class="renderer">
    <canvas ref="canvas" width="384" height="216"></canvas>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Renderer',

  props: {
    running: {
      type: Boolean,
      default: false
    },

    clearColour: {
      type: String,
      default: '#FF004D'
    }
  },

  data () {
    return {
      context: undefined,
      observer: undefined,
      runHandler: undefined
    }
  },

  created () {
    this.runHandler = this.run.bind(this)
  },

  mounted () {
    /*this.observer = new MutationObserver(m => {
      // console.log(this.$slots.default)
    })
    this.observer.observe(
      this.$el,
      { attributes: true, childList: true, characterData: true, subtree: true }
    )*/

    this.context = this.$refs.canvas.getContext('2d')
    if (this.running) this.run()
  },

  beforeDestroy () {
    this.observer.disconnect()
  },

  methods: {
    run () {
      if (!this.running) return
      this.update()
      this.draw()
      requestAnimationFrame(this.runHandler)
    },

    update () {

    },

    draw () {
      const { context } = this
      const { width, height } = this.$refs.canvas

      context.fillStyle = this.clearColour
      context.fillRect(0, 0, width, height)

      this.$slots.default && this.$slots.default.forEach(vnode => {
        if (vnode.componentInstance && vnode.componentInstance.draw) {
          vnode.componentInstance.draw(context)
        }
      })
    }
  },

  watch: {
    running (shouldRun, wasRunning) {
      if (shouldRun && !wasRunning) {
        this.run()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .renderer
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center

  canvas
    width: 100%
    background: #FF004D
    image-rendering: pixelated
</style>
