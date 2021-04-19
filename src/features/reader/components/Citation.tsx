import {Box} from "@theme-ui/components"
import {FunctionComponent, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import useIsVisible from "src/common/hooks/useIsVisible"
import {Citation as TCitation, citationById} from "src/features/paperPicker/paperPickerSlice"
import {resourceHasHover, setHoverResource, setIsVisible} from "../readerSlice"

interface CitationProps {
	id: string
}

/**
 * Renders the short form of a citation in the main reading panel of the paper.
 *
 * If the user hovers over this component, it will be highlighted in the "related" panel.
 * @param id 			The id of the citation to be rendered
 */
const Citation: FunctionComponent<CitationProps> = ({ id }) => {
	const ref: any = useRef<HTMLSpanElement>()
	const dispatch = useDispatch()
	useIsVisible<HTMLSpanElement>(ref, (isVisible) => dispatch(setIsVisible({ id, kind: 'citation', isVisible })))
	const citation = useSelector(citationById(id)) as TCitation
	const hasHover = useSelector(resourceHasHover(id, 'citation'))

	const onMouseEnter = () => {
		dispatch(setHoverResource({
			kind: 'citation',
			id: id
		}))
	}

	const onMouseLeave = () => {
		dispatch(setHoverResource(undefined))
	}

	return (
		<Box
			as="span"
			ref={ref} 
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			sx={{ backgroundColor: hasHover ? 'green' : 'transparent' }}
		>
			{citation.shortForm}
		</Box>
	)
}

export default Citation
