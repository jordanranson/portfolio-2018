<script>
export default {
  name: 'layer',

  props: {
    width: {
      type: [ Number, String ],
      default: 'auto'
    },
    height: {
      type: [ Number, String ],
      default: 'auto'
    },
    padding: {
      type: [ Number, String ],
      default: 0
    },
    clearColour: {
      type: String,
      default: 'transparent'
    }
  },

  data () {
    return {
      canvas: undefined,
      context: undefined
    }
  },

  computed: {
    size () {
      const width = this.width === 'auto'
        ? 384
        : this.width
      const height = this.height === 'auto'
        ? 32
        : this.height
      return { width, height }
    }
  },

  render () {
    const { width, height } = this.size
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    this.canvas = canvas
    this.context = this.canvas.getContext('2d')

    /*this.$slots.default.forEach(vnode => {
      console.log(vnode.text.trim())
    })*/
    return false
  },

  methods: {
    draw () {
      this.$slots.default && this.$slots.default.forEach(vnode => {
        if (vnode.componentInstance && vnode.componentInstance.draw) {
          vnode.componentInstance.draw()
        }
      })
    }
  }
}
</script>
