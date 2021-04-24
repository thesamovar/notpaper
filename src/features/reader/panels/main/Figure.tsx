import { Box } from '@theme-ui/components'
import _ from 'lodash'
import { FunctionComponent, useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useIsVisible from 'src/common/hooks/useIsVisible'
import { Figure as TFigure, FigureRef } from 'src/common/types'
import { figureById } from 'src/features/paper/paperSlice'
import {
  resourceHasHover,
  toggleHoveredResource,
  setIsVisible,
  setNotVisible,
} from 'src/features/reader/readerSlice'

interface FigureProps {
  figureRef: FigureRef
}

/**
 * Renders the short form of a figure in the main reading panel of the paper.
 *
 * If the user hovers over this component, it will be highlighted in the "related" panel.
 *
 * @param figureRef 			The reference to the figure
 * @returns 							A span containing the short-form of the figure
 */
const Figure: FunctionComponent<FigureProps> = ({ figureRef }) => {
  const [componentId] = useState(_.uniqueId('figure-')) // Used to keep track of duplicate citations on-screen

  const ref: any = useRef<HTMLSpanElement>()
  const dispatch = useDispatch()
  const handleIsVisible = useCallback(
    (isVisible: boolean) => {
      if (isVisible) {
        dispatch(setIsVisible({ componentId, ...figureRef }))
      } else {
        dispatch(setNotVisible({ componentId, ...figureRef }))
      }
    },
    [dispatch, figureRef, componentId],
  )
  useIsVisible<HTMLSpanElement>(ref, handleIsVisible)
  const figure = useSelector(figureById(figureRef.id)) as TFigure
  const hasHover = useSelector(resourceHasHover(figureRef))

  const toggleHover = () => dispatch(toggleHoveredResource(figureRef))

  return (
    <Box
      className="fig"
      as="span"
      ref={ref}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      sx={{ backgroundColor: hasHover ? 'lightgreen' : 'transparent' }}
    >
      ({figure.shortForm})
    </Box>
  )
}

export default Figure
