import { heading } from './typography'

const styles = {
  root: {
    margin: 0,
    fontSize: ['14px', '14px', '14px', '15px', '16px'],
    fontFamily: 'body',
    lineHeight: 'body',
    fontWeight: 'body',
  },
  a: {
    color: 'primary',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  p: {
    fontSize: 1,
  },
  h1: {
    ...heading,
    fontSize: 8,
    mt: 2,
  },
  h2: {
    ...heading,
    fontSize: 5,
    mt: 2,
  },
  h3: {
    ...heading,
    fontSize: 3,
    mt: 3,
  },
  h4: {
    ...heading,
    fontSize: 1,
  },
  h5: {
    ...heading,
    fontSize: 2,
  },
  h6: {
    ...heading,
    fontSize: 1,
    mb: 2,
  },
  code: {},
  pre: {},
  hr: {
    bg: 'muted',
    border: 0,
    height: '1px',
    m: 3,
  },
}

export default styles
