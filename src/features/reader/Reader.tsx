/**
 * Reader Component
 */

import { Box } from '@theme-ui/components'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { getActivePaper } from '../paper/paperSlice'
import MainPanel from './panels/main/MainPanel'
import RelatedPanel from './panels/related/RelatedPanel'

export interface ReaderProps {
  panels: ReactNode[]
}

/**
 * Render the multi-panel reader
 *
 * Panels:
 * 		MainPanel 		Renders the paper by its narrative
 * 		RelatedPanel 	Renders the related resources from the paper
 *
 * @returns A Box containing the panels of the reader
 *
 */
const Reader = () => {
  const activePaper = useSelector(getActivePaper)

  if (!activePaper) {
    throw new Error(`activePaper is undefined!`)
  }

  return (
    <Box id="reader" sx={{ display: 'flex' }}>
      <MainPanel paper={activePaper} />
      <RelatedPanel />
    </Box>
  )
}

export default Reader
