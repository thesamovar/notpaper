import {Box} from "@theme-ui/components"
import {FunctionComponent, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import useIsVisible from "src/common/hooks/useIsVisible"
import {Citation as TCitation, citationById, CitationRef} from "src/features/paperPicker/paperPickerSlice"
import {resourceHasHover, toggleHoveredResource, setIsVisible} from "../readerSlice"

interface CitationProps {
	resourceRef: CitationRef
}

/**
 * Renders the short form of a citation in the main reading panel of the paper.
 *
 * If the user hovers over this component, it will be highlighted in the "related" panel.
 * @param resourceRef 			The reference to the resource being rendered
 */
const Citation: FunctionComponent<CitationProps> = ({ resourceRef }) => {
	const ref: any = useRef<HTMLSpanElement>()
	const dispatch = useDispatch()
	useIsVisible<HTMLSpanElement>(ref, (isVisible) => dispatch(setIsVisible({ ...resourceRef, isVisible })))
	const citation = useSelector(citationById(resourceRef.id)) as TCitation
	const hasHover = useSelector(resourceHasHover(resourceRef))

	const toggleHover = () => dispatch(toggleHoveredResource(resourceRef))

	return (
		<Box
			as="span"
			ref={ref} 
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
			sx={{ backgroundColor: hasHover ? 'green' : 'transparent' }}
		>
			({citation.shortForm})
		</Box>
	)
}

export default Citation
