import { FunctionComponent, MouseEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FlexBox from 'src/common/components/FlexBox'
import { Citation as TCitation, CitationRef } from 'src/common/types'
import { citationById } from 'src/features/paper/paperSlice'
import {
  pinResource,
  resourceHasHover,
  resourceIsPinned,
  toggleHoveredResource,
} from '../../readerSlice'
import Pin from 'src/common/components/Pin'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface CitationProps {
  citationRef: CitationRef
}

/**
 * Renders a citation as a related resource.
 *
 * @param citationRef 		A ResourceRef with kind 'citation'
 *
 * @returns 							A padded FlexBox containing the long-form of the citation
 */
const Citation: FunctionComponent<CitationProps> = ({ citationRef }) => {
  const [isExpanded, setExpanded] = useState(false)
  const dispatch = useDispatch() // Used to trigger a state-update
  const citation = useSelector(citationById(citationRef.id)) as TCitation
  const hasHover = useSelector(resourceHasHover(citationRef))
  const isPinned = useSelector(resourceIsPinned(citationRef))
  const shouldShowPin = hasHover || isPinned

  const togglePinned = (e: MouseEvent) => {
    e.stopPropagation() // So that the parent element's onClick doesn't also trigger
    dispatch(pinResource({ ...citationRef, isPinned: !isPinned }))
    if (hasHover) {
      // We do this because the mouseLeave event won't trigger
      toggleHover()
    }
  }
  const toggleHover = () => dispatch(toggleHoveredResource(citationRef))
  const mouseEnter = () => !hasHover && toggleHover()
  const mouseLeave = () => hasHover && toggleHover()
  const toggleExpand = () => setExpanded(!isExpanded)

  return (
    <FlexBox
      sx={{
        p: '10px',
        mb: 1,
        minHeight: isExpanded ? '200px' : 'unset',
        borderRadius: '10px',
        backgroundColor: hasHover ? 'lightgreen' : '#eeeeee',
        position: 'relative',
        cursor: 'pointer',
      }}
      column
      onClick={toggleExpand}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      {shouldShowPin && <Pin onClick={togglePinned} />}
      {citation.text}
      {isExpanded ? (
        <FaChevronUp onClick={toggleExpand} />
      ) : (
        <FaChevronDown onClick={toggleExpand} />
      )}
      {isExpanded && <FlexBox sx={{ pt: 3 }}>Abstract goes here...</FlexBox>}
    </FlexBox>
  )
}

export default Citation
