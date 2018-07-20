<template>
  <div>
    <slot />
  </div>
</template>

<script>
const Layer = {
  AUTO_WIDTH: 16,
  AUTO_HEIGHT: 16,
  SCREEN_WIDTH: 384,
  SCREEN_HEIGHT: 216
}

function getPercentage (str, value) {
  const percent = Number(str.replace('%', '')) / 100
  return Math.round(value * percent)
}

export default {
  name: 'layer',

  props: {
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    right: {
      type: [ Number, undefined ],
      default: undefined
    },
    bottom: {
      type: [ Number, undefined ],
      default: undefined
    },
    flow: {
      type: String,
      default: 'vertical'
    },
    width: {
      type: [ Number, String ],
      default: 'auto'
    },
    height: {
      type: [ Number, String ],
      default: Layer.AUTO_HEIGHT
    },
    padding: {
      type: [ Number, String ],
      default: 0
    },
    position: {
      type: String,
      default: 'relative'
    },
    background: {
      type: String,
      default: 'transparent'
    }
  },

  data () {
    return {
      canvas: undefined,
      context: undefined,
      isLayer: true
    }
  },

  computed: {
    size () {
      let width = Number(this.width)

      if (typeof this.width === 'string' && (this.width === 'auto' || this.width.includes('%'))) {
        if (this.$parent && this.$parent.isLayer) {
          const parentWidth = this.$parent.size.width
          const { left, right } = this.$parent.paddingSize
          width = parentWidth - left - right
        }

        else if (this.$parent && this.$parent.width) {
          width = this.$parent.width
        }

        else {
          width = Layer.AUTO_WIDTH
        }

        if (this.width.includes('%')) {
          width = getPercentage(this.width, width)
        }
      }

      let height = Number(this.height)

      if (typeof this.height === 'string' && (this.height === 'auto' || this.height.includes('%'))) {
        if (this.$parent && this.$parent.isLayer) {
          const parentHeight = this.$parent.size.height
          const { top, bottom } = this.$parent.paddingSize
          height = parentHeight - top - bottom
        }

        else if (this.$parent && this.$parent.height) {
          height = this.$parent.height
        }

        else {
          height = Layer.AUTO_HEIGHT
        }

        if (this.height.includes('%')) {
          height = getPercentage(this.height, height)
        }
      }

      return { width, height }
    },

    paddingSize () {
      const { padding } = this

      let top = 0
      let left = 0
      let right = 0
      let bottom = 0

      if (typeof padding === 'string') {
        const parts = padding.split(' ')

        if (parts.length === 1) {
          top = left = right = bottom = Number(parts[0])
        }

        else if (parts.length === 2) {
          top = bottom = Number(parts[0])
          left = right = Number(parts[1])
        }

        else {
          top = Number(parts[0])
          left = Number(parts[3])
          right = Number(parts[1])
          bottom = Number(parts[2])
        }
      }

      else if (typeof padding === 'number') {
        top = left = right = bottom = padding
      }

      return { top, left, right, bottom }
    }
  },

  created () {
    const { width, height } = this.size
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
  },

  methods: {
    draw () {
      const { context, left, top, size, paddingSize: padding } = this

      this.canvas.width = size.width
      this.canvas.height = size.height

      this.context = this.canvas.getContext('2d')
      this.context.fillStyle = this.background
      this.context.fillRect(0, 0, size.width, size.height)

      let width = 0
      let height = 0

      this.$slots.default && this.$slots.default.forEach(vnode => {
        const component = (vnode.componentInstance && vnode.componentInstance.isLayer)
          ? vnode.componentInstance
          : undefined

        if (component) {
          const canvas = component.draw()

          if (component.position === 'absolute') {
            let drawx = 0
            if (component.right !== undefined) {
              drawx =
                left
                + (size.width - component.size.width)
                - padding.right
                - component.right
            } else {
              drawx =
                left
                + padding.left
                + component.left
            }

            let drawy = 0
            if (component.bottom !== undefined) {
              drawy =
                top
                + (size.height - component.size.height)
                - padding.bottom
                - component.bottom
            } else {
              drawy =
                top
                + padding.top
                + component.top
            }

            context.drawImage(canvas, drawx, drawy)
          } else {
            const drawx = left + padding.left + component.left + width
            const drawy = top + padding.top + component.top + height
            context.drawImage(canvas, drawx, drawy)

            if (this.flow === 'vertical') {
              height += component.size.height
            } else {
              width += component.size.width
            }
          }
        }
      })

      return this.canvas
    }
  }
}
</script>
