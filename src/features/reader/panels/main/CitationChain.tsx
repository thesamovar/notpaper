import {Box} from "@theme-ui/components"
import {FunctionComponent, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import useIsVisible from "src/common/hooks/useIsVisible"
import {Citation as TCitation, CitationRef, RefChain} from "src/common/types"
import { citationsById } from "src/features/paper/paperSlice"
import {citationChainHasHover, toggleHoveredResource, setIsVisible, setNotVisible} from "src/features/reader/readerSlice"

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
		refChain.forEach(resourceRef => {
			if (isVisible) {
				dispatch(setIsVisible(resourceRef))
			} else {
				dispatch(setNotVisible(resourceRef))
			}
		})
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
			sx={{ backgroundColor: hasHover ? 'lightgreen' : 'transparent' }}
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
