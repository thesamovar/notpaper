import { darken } from 'polished'

export const darkenAll = (colors: { [s: string]: string}) => {
  return Object.entries(colors).reduce((acc, [name, value]) => {
    return {
      ...acc,
      [name]: [0.1, 0.2, 0.3].map(degree => (
        darken(degree, value)
      ))
    }
  }, {})
}

