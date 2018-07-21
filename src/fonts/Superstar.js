import Font from '@/fonts/font.js'
import Superstar from '@/assets/fonts/superstar.png'

const font = new Font({
  bitmap: Superstar,
  charMap: [
    [
      'A', 'B', 'C', 'D', 'E', 'F', 'G',
      'H', 'I', 'J', 'K', 'L', 'M', 'N',
      'O', 'P', 'Q', 'R', 'S', 'T', 'U',
      'V', 'W', 'X', 'Y', 'Z'
    ]
  ],
  rowHeight: 9
})

export default font
