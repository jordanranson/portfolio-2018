import Font from '@/fonts/font.js'
import EightBitFortress from '@/assets/fonts/8-bit-fortress.png'

const font = new Font({
  bitmap: EightBitFortress,
  charMap: [
    [
      'A', 'B', 'C', 'D', 'E', 'F', 'G',
      'H', 'I', 'J', 'K', 'L', 'M', 'N',
      'O', 'P', 'Q', 'R', 'S', 'T', 'U',
      'V', 'W', 'X', 'Y', 'Z'
    ],
    [
      'a', 'b', 'c', 'd', 'e', 'f', 'g',
      'h', 'i', 'j', 'k', 'l', 'm', 'n',
      'o', 'p', 'q', 'r', 's', 't', 'u',
      'v', 'w', 'x', 'y', 'z'
    ],
    [
      '0', '1', '2', '3', '4', '5', '6',
      '7', '8', '9', ',', '.', '?', '!',
      '(', ')', '+', '-'
    ]
  ],
  rowHeight: 7
})

export default font
