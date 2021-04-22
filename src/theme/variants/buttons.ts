import { themeGet } from '@styled-system/theme-get'
import { Theme } from '../types'

export default (theme: Theme) => ({
  gradient: {
    background: themeGet('colors.gradient')({ theme }),
    color: 'white'
  },
  light: {
    backgroundColor: 'light',
    color: 'primary',
  },
  disabled: {
    backgroundColor: '#d7d7d7',
    color: '#8a8a8a',
    cursor: 'not-allowed',
  },
  primary: {
    backgroundColor: 'primary',
    color: 'white',
  },
  pink: {
    backgroundColor: '#D16BA5',
    color: 'white',
  },
  'outline-primary': {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: 'primary',
    color: 'primary'
  },
  outline: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: 'primary',
    color: 'primary',
  },
  discord: {
    backgroundColor: 'discord',
    color: 'white'
  }
})
