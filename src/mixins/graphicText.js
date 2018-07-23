import Colour from 'color'
import colours from '@/constants/colours'

export default {
  props: {
    font: {
      type: Object,
      required: true
    },
    colour: {
      type: String,
      default: colours.BLACK
    },
    lineSpacing: {
      type: Number,
      default: 3
    },
    wordSpacing: {
      type: Number,
      default: 3
    },
    letterSpacing: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      text: this.getText(),
      fontBuffer: {},
      needsResize: true,
    }
  },

  computed: {
    size () {
      const { font, paddingSize } = this

      let left = (paddingSize.left + paddingSize.right) || 1
      let width = left
      let height = (paddingSize.top + paddingSize.bottom + font.rowHeight) || 1

      this.text.split('').forEach((char) => {
        if (char === ' ' && left !== 0) {
          left += this.wordSpacing
          return
        }

        if (char === String.fromCharCode(10)) {
          height += font.rowHeight + this.lineSpacing
          left = 0
          return
        }

        const charData = font.fontData[char]
        if (!charData) return

        left += charData.width + this.letterSpacing
        if (left > width) width = left
      })

      return { width, height }
    }
  },

  updated () {
    this.text = this.getText()
  },

  methods: {
    getText () {
      return ((
        this.$slots
        && this.$slots.default
        && this.$slots.default[0]
        && this.$slots.default[0].text
      ) || '').trim().replace(/  +/g, ' ')
    },

    getBuffer (colour) {
      if (this.fontBuffer[colour]) {
        return this.fontBuffer[colour]
      }

      // Set colour of the font
      const imageData = this.font.getImageData()
      const { r, g, b } = Colour(colour).rgb().object()

      for (let i = 0; i < imageData.data.length; i += 4) {
        const alpha = i+3
        if (alpha !== 0) {
          imageData.data[i] = r
          imageData.data[i + 1] = g
          imageData.data[i + 2] = b
        }
      }

      // Setup buffer canvas
      const { font } = this
      const fontBuffer = document.createElement('canvas')
      fontBuffer.width = font.canvas.width
      fontBuffer.height = font.canvas.height

      // Put new image data into the buffer
      const context = fontBuffer.getContext('2d')
      context.putImageData(imageData, 0, 0)

      this.fontBuffer[colour] = fontBuffer
    },

    draw (ofsx, ofsy, colour) {
      const {
        font,
        context,
        paddingSize
      } = this

      let fontBuffer
      if (font.ready) {
        fontBuffer = this.getBuffer(colour || this.colour)
      }

      this.clear()

      if (fontBuffer) {
        let top = paddingSize.top
        let left = paddingSize.left

        this.text.split('').forEach((char) => {
          if (char === ' ' && left !== 0) {
            left += this.wordSpacing
            return
          }

          if (char === String.fromCharCode(10)) {
            top += font.rowHeight + this.lineSpacing
            left = paddingSize.left
            return
          }

          const charData = font.fontData[char]
          if (!charData) return

          context.drawImage(
            fontBuffer,
            charData.x,
            charData.y,
            charData.width,
            charData.height,
            left,
            top,
            charData.width,
            charData.height
          )

          left += charData.width + this.letterSpacing
        })
      }

      return this.canvas
    }
  }
}
