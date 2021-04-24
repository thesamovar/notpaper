import { Box } from '@theme-ui/components'
import _ from 'lodash'
import { FunctionComponent, useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import useIsVisible from 'src/common/hooks/useIsVisible'
import { Citation as TCitation, CitationRef } from 'src/common/types'
import { citationById } from 'src/features/paper/paperSlice'
import {
  resourceHasHover,
  toggleHoveredResource,
  setIsVisible,
  setNotVisible,
} from 'src/features/reader/readerSlice'

interface CitationProps {
  citationRef: CitationRef
}

/**
 * Renders the short form of a citation in the main reading panel of the paper.
 *
 * If the user hovers over this component, it will be highlighted in the "related" panel.
 *
 * @param citationRef 			The reference to the resource being rendered
 * @returns 								A span containing the short-form of the citation
 */
const Citation: FunctionComponent<CitationProps> = ({ citationRef }) => {
  const [componentId] = useState(_.uniqueId('citation-')) // Used to keep track of duplicate citations on-screen

  const ref: any = useRef<HTMLSpanElement>()
  const dispatch = useDispatch()
  const handleIsVisible = useCallback(
    (isVisible: boolean) => {
      if (isVisible) {
        dispatch(setIsVisible({ componentId, ...citationRef }))
      } else {
        dispatch(setNotVisible({ componentId, ...citationRef }))
      }
    },
    [citationRef, dispatch, componentId],
  )
  useIsVisible<HTMLSpanElement>(ref, handleIsVisible)
  const citation = useSelector(citationById(citationRef.id)) as TCitation
  const hasHover = useSelector(resourceHasHover(citationRef))

  const toggleHover = () => dispatch(toggleHoveredResource(citationRef))

  return (
    <span>
      <Box
        className="cit"
        as="span"
        ref={ref}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        sx={{ backgroundColor: hasHover ? 'lightgreen' : 'transparent' }}
        data-tip
      >
        ({citation.shortForm})
      </Box>
      <ReactTooltip place="top" type="dark" effect="float">
        Lorem ipsum....
      </ReactTooltip>
    </span>
  )
}

export default Citation
