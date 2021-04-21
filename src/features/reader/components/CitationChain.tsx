import {Box} from "@theme-ui/components"
import {FunctionComponent, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import useIsVisible from "src/common/hooks/useIsVisible"
import {Citation as TCitation, citationById, CitationRef, citationsById, RefChain} from "src/features/paperPicker/paperPickerSlice"
import {citationChainHasHover, toggleHoveredResource, setIsVisible} from "../readerSlice"

interface CitationChainProps {
	refChain: RefChain<CitationRef>
}

/**
 * Renders a chain of citations in short-form
 *
 * If the user hovers over this component, the citations will be highlighted in the "related" panel.
 * @param refChain 			The citations to be rendered
 */
const CitationChain: FunctionComponent<CitationChainProps> = ({ refChain }) => {
	const ref: any = useRef<HTMLSpanElement>()
	const dispatch = useDispatch()
	useIsVisible<HTMLSpanElement>(ref, (isVisible) => (
		refChain.forEach(ref => dispatch(setIsVisible({ ...ref, isVisible })))
	))

	const citations = useSelector(citationsById(refChain.map(ref => ref.id))) as TCitation[]
	const hasHover = useSelector(citationChainHasHover(refChain))

	const toggleHover = () => {
		refChain.forEach(ref => dispatch(toggleHoveredResource(ref)))
	}

	return (
		<Box
			as="span"
			ref={ref} 
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
			sx={{ backgroundColor: hasHover ? 'green' : 'transparent' }}
		>
			(
				{
					citations?.map(({ shortForm }) => shortForm).join('; ')
				}
			)
		</Box>
	)
}

export default CitationChain
