export interface Theme {
  fonts: {
    body: string,
    heading: string
  },
  lineHeights: {
    heading: string | number,
    body: string | number
  },
  fontSizes: string[],
  borderWidths: any,
  breakpoints: any,
  colors: {
    [s: string]: any
  },
  fontWeights: number[] | string[] | object,
  letterSpacings: number[] | string[] | object,
  sizes: number[] | string[] | object,
  shadows: number[] | string[] | object,
  space: number[] | string[] | object,
  radii: number[] | object,
  styles: object,
  buttons?: {
    [s: string]: object
  },
  variants: {
    [s: string]: object
  }
}
