import {Box} from "@theme-ui/components"
import {FunctionComponent, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import useIsVisible from "src/common/hooks/useIsVisible"
import {Figure as TFigure, FigureRef} from "src/common/types"
import { figureById } from "src/features/paper/paperSlice"
import {resourceHasHover, toggleHoveredResource, setIsVisible, setNotVisible} from "src/features/reader/readerSlice"

interface FigureProps {
	figureRef: FigureRef
}

/**
 * Renders the short form of a figure in the main reading panel of the paper.
 *
 * If the user hovers over this component, it will be highlighted in the "related" panel.
 * @param figureRef 			The reference to the figure
 */
const Figure: FunctionComponent<FigureProps> = ({ figureRef }) => {
	const ref: any = useRef<HTMLSpanElement>()
	const dispatch = useDispatch()
	useIsVisible<HTMLSpanElement>(ref, (isVisible) => {
		if (isVisible) {
			dispatch(setIsVisible(figureRef))
		} else {
			dispatch(setNotVisible(figureRef))
		}
	})
	const figure = useSelector(figureById(figureRef.id)) as TFigure
	const hasHover = useSelector(resourceHasHover(figureRef))

	const toggleHover = () => dispatch(toggleHoveredResource(figureRef))

	return (
		<Box
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
