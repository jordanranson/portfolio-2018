<template>
  <div class="renderer">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
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
      width: 384,
      height: 216,
      screen: { x: 0, y: 0, width: 384, height: 432 },
      context: undefined,
      observer: undefined,
      runHandler: undefined,
      scrollHandler: undefined
    }
  },

  created () {
    this.runHandler = this.run.bind(this)
    this.scrollHandler = this.scroll.bind(this)

    document.body.addEventListener('wheel', this.scrollHandler)
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
    // this.observer.disconnect()
    document.body.removeEventListener('wheel', this.scrollHandler)
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
      const { context, screen } = this

      context.fillStyle = this.clearColour
      context.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)

      let height = 0

      this.$slots.default && this.$slots.default.forEach(vnode => {
        const component = (vnode.componentInstance && vnode.componentInstance.draw)
          ? vnode.componentInstance
          : undefined

        if (component) {
          const { top, left } = component
          context.drawImage(component.draw(), Math.round(left+screen.x), Math.round(top+screen.y+height))
          height += (component.size && component.size.height) || 0
        }
      })
    },

    scroll (evt) {
      this.screen.y -= evt.deltaY / 10
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
    div
      position: absolute
      transform: translate(-1000vw, -1000vh)

  canvas
    width: 100%
    background: #FF004D
    image-rendering: pixelated
</style>
