import {Image} from "@theme-ui/components"
import {FunctionComponent} from "react"
import {useDispatch, useSelector} from "react-redux"
import FlexBox from "src/common/components/FlexBox"
import Pin from "src/common/components/Pin"
import {Figure as TFigure, FigureRef} from "src/common/types"
import { figureById } from "src/features/paper/paperSlice"
import {pinResource, resourceHasHover, resourceIsPinned, toggleHoveredResource} from "../../readerSlice"


interface FigureProps {
	figureRef: FigureRef
}

/**
 * Renders a figure from the paper as a related resource.
 *
 * @param figureRef 		A resourceRef of kind 'figure'
 * @returns 						A padded FlexBox containing the figure as an image
 */
const Figure: FunctionComponent<FigureProps> = ({ figureRef }) => {
	const dispatch = useDispatch()
	const figure = useSelector(figureById(figureRef.id)) as TFigure
	const hasHover = useSelector(resourceHasHover(figureRef))
	const isPinned = useSelector(resourceIsPinned(figureRef))
	const shouldShowPin = hasHover || isPinned

	const togglePinned = () => {
		dispatch(pinResource({ ...figureRef, isPinned: !isPinned }))
		if (hasHover) {
			// The mouseLeave event won't trigger when we pin a resource
			toggleHover()
		}
	}
	const toggleHover = () => dispatch(toggleHoveredResource(figureRef))
	const mouseEnter = () => !hasHover && toggleHover()
	const mouseLeave = () => hasHover && toggleHover()

	return (
		<FlexBox 
			sx={{ 
				p: '10px', 
				mb: 1,
				borderRadius: '10px',
				backgroundColor: hasHover ? 'lightgreen' : '#eeeeee',
				position: 'relative'
			}}
			onMouseEnter={mouseEnter}
			onMouseLeave={mouseLeave}
		>
			{
				shouldShowPin && <Pin onClick={togglePinned} />
			}
			<Image src={`data:image/jpeg;base64,${figure.b64}`} /> 
		</FlexBox>
	)
}

export default Figure
