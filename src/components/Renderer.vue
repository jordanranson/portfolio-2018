<template>
  <div class="renderer" :style="{ cursor }">
    <canvas ref="canvas" :width="width" :height="height" @mousemove="mousemove" @click="click"></canvas>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Renderer',

  provide () {
    return {
      state: this.$data
    }
  },

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
      cursor: 'default',
      screen: { x: 0, y: 0, width: 384, height: 432 },
      context: undefined,
      observer: undefined,
      cursorPos: { x: 0, y: 0 },
      runHandler: undefined,
      cursorTapped: false,
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
      this.draw()
      requestAnimationFrame(this.runHandler)
    },

    draw () {
      this.cursor = 'default'

      const { canvas } = this.$refs
      if (!canvas) return

      const { context, screen } = this
      context.fillStyle = this.clearColour
      context.fillRect(0, 0, canvas.width, canvas.height)

      let height = 0

      this.$slots.default && this.$slots.default.forEach(vnode => {
        const component = (vnode.componentInstance && vnode.componentInstance.draw)
          ? vnode.componentInstance
          : undefined

        if (component) {
          const { top, left } = component
          const x = Math.round(left+screen.x)
          const y = Math.round(top+screen.y+height)
          context.drawImage(component.draw(x, y), x, y)
          height += (component.size && component.size.height) || 0
        }
      })
    },

    // Event handlers

    scroll (evt) {
      this.screen.y -= evt.deltaY / 10
    },

    click (evt) {
      this.cursorTapped = true
    },

    mousemove (evt) {
      const { canvas } = this.$refs

      const brect = canvas.getBoundingClientRect()
      const scale = brect.width / 384

      this.cursorPos.x = Math.round((evt.clientX - canvas.offsetLeft) / scale)
      this.cursorPos.y = Math.round((evt.clientY - canvas.offsetTop) / scale)
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
    position: relative
    align-items: center
    justify-content: center
    div
      position: absolute
      transform: translate(-1000vw, -1000vh)

  canvas
    width: 100%
    // width: 720px
    background: #FF004D
    image-rendering: pixelated
</style>
