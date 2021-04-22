import rem from "./rem";

export const borderWidths = {
  px: '1px',
  0: '0',
  2: '2px',
  4: '4px',
  8: '8px'
}

// export const breakpoints = {
//   xs: 0,
//   sm: 576,
//   md: 768,
//   lg: 992,
//   xl: 1200
// }

export const breakpoints = [
  '576px',
  '768px',
  '992px',
  '1200px',
  '1500px'
]

const spacing = {
  px: '1px',
  0: '0',
  1: rem(0.25),
  2: rem(0.5),
  3: rem(0.75),
  4: rem(1),
  5: rem(1.25),
  6: rem(1.5),
  8: rem(2),
  10: rem(2.5),
  12: rem(3),
  16: rem(4),
  20: rem(5),
  24: rem(6),
  32: rem(8),
  40: rem(10),
  48: rem(12),
  56: rem(14),
  64: rem(16)
}

const maxWidth = {
  xs: rem(20),
  sm: rem(24),
  md: rem(28),
  lg: rem(32),
  xl: rem(36),
  '2xl': rem(42),
  '3xl': rem(48),
  '4xl': rem(56),
  '5xl': rem(64),
  '6xl': rem(72)
}

const width = {
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/8': '12.5%',
  '2/8': '25%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%'
}

export const sizes = {
  ...spacing,
  ...maxWidth,
  ...width,
  full: '100%',
  screenHeight: '100vh',
  screenWidth: '100vw'
}

export const space = [
  // Margin and padding
  0,
  rem(0.25),
  rem(0.5),
  rem(1),
  rem(1.5),
  rem(2),     // 5
  rem(2.5),
  rem(3),
  rem(4),     // 8
  rem(8),
  rem(12),    // 10
  rem(16),
  rem(32)
]
