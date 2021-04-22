const px = 16

const buildRem = (px: number) => (rem: number) => `${px * rem}px`

export default buildRem(px)
