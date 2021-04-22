import {FunctionComponent} from "react"
import {useDispatch, useSelector} from "react-redux"
import FlexBox from "src/common/components/FlexBox"
import {Citation as TCitation, CitationRef} from "src/common/types"
import { citationById } from "src/features/paper/paperSlice"
import {pinResource, resourceHasHover, resourceIsPinned, toggleHoveredResource} from "../../readerSlice"


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
	const dispatch = useDispatch()
	const citation = useSelector(citationById(citationRef.id)) as TCitation
	const hasHover = useSelector(resourceHasHover(citationRef))
	const isPinned = useSelector(resourceIsPinned(citationRef))

	const togglePinned = () => {
		dispatch(pinResource({ ...citationRef, isPinned: !isPinned }))
	}
	const toggleHover = () => dispatch(toggleHoveredResource(citationRef))

	return (
		<FlexBox 
			sx={{ 
			  p: '10px', 
				mb: 1,
				borderRadius: '10px',
				backgroundColor: hasHover ? 'lightgreen' : '#eeeeee' 
			}}
			onClick={togglePinned}
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
		>
			{ citation.text }
		</FlexBox>
	)
}

export default Citation
