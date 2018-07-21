class Font {
  constructor ({ bitmap, charMap, rowHeight }) {
    this.ready = false
    this.canvas = undefined
    this.context = undefined
    this.charMap = charMap
    this.fontData = {}
    this.rowHeight = rowHeight

    const image = new Image()
    image.onload = this.generate.bind(this, image)
    image.src = bitmap
  }

  generate (image) {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height

    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0)

    this.canvas = canvas
    this.context = canvas.getContext('2d')

    const fontData = {}
    const { charMap, rowHeight } = this

    charMap.forEach((charRow, rowY) => {
      const top = rowHeight * rowY
      const row = []

      let width = 0
      for (let x = 0; x < canvas.width; x++) {
        let isNext = true

        for (let y = top; y < top + rowHeight; y++) {
          const pixel = context.getImageData(x, y, 1, 1)
          if (pixel.data[3] !== 0) {
            isNext = false
            break
          }
        }

        if (isNext) {
          if (width === 0) break
          row.push({
            x: x - width,
            y: top,
            width,
            height: rowHeight
          })
          width = 0
        } else {
          width++
        }
      }

      row.forEach((charData, i) => {
        fontData[charRow[i]] = charData
      })
    })

    this.fontData = fontData
    this.ready = true
  }

  getImageData () {
    return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }
}

export default Font
