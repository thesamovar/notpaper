import {Box} from "@theme-ui/components"
import {FunctionComponent, useCallback, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import useIsVisible from "src/common/hooks/useIsVisible"
import {Citation as TCitation, CitationRef} from "src/common/types"
import { citationById } from "src/features/paper/paperSlice"
import {resourceHasHover, toggleHoveredResource, setIsVisible, setNotVisible} from "src/features/reader/readerSlice"

interface CitationProps {
	citationRef: CitationRef
}

/**
 * Renders the short form of a citation in the main reading panel of the paper.
 *
 * If the user hovers over this component, it will be highlighted in the "related" panel.
 * @param citationRef 			The reference to the resource being rendered
 */
const Citation: FunctionComponent<CitationProps> = ({ citationRef }) => {
	const ref: any = useRef<HTMLSpanElement>()
	const dispatch = useDispatch()
	const handleIsVisible = useCallback((isVisible: boolean) => {
		if (isVisible) {
			dispatch(setIsVisible(citationRef))
		} else {
			dispatch(setNotVisible(citationRef))
		}
	}, [])
	useIsVisible<HTMLSpanElement>(ref, handleIsVisible)
	const citation = useSelector(citationById(citationRef.id)) as TCitation
	const hasHover = useSelector(resourceHasHover(citationRef))

	const toggleHover = () => dispatch(toggleHoveredResource(citationRef))

	return (
		<Box
			className="cit"
			as="span"
			ref={ref} 
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
			sx={{ backgroundColor: hasHover ? 'lightgreen' : 'transparent' }}
		>
			({citation.shortForm})
		</Box>
	)
}

export default Citation
