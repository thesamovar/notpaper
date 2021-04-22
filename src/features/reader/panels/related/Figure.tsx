import {Image} from "@theme-ui/components"
import {FunctionComponent} from "react"
import {useDispatch, useSelector} from "react-redux"
import FlexBox from "src/common/components/FlexBox"
import {Figure as TFigure, FigureRef} from "src/common/types"
import { figureById } from "src/features/paper/paperSlice"
import {pinResource, resourceHasHover, resourceIsPinned, toggleHoveredResource} from "../../readerSlice"


interface FigureProps {
	figureRef: FigureRef
}

const Figure: FunctionComponent<FigureProps> = ({ figureRef }) => {
	const dispatch = useDispatch()
	const figure = useSelector(figureById(figureRef.id)) as TFigure
	const hasHover = useSelector(resourceHasHover(figureRef))
	const isPinned = useSelector(resourceIsPinned(figureRef))

	const togglePinned = () => {
		dispatch(pinResource({ ...figureRef, isPinned: !isPinned }))
	}
	const toggleHover = () => dispatch(toggleHoveredResource(figureRef))

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
			<Image src={`data:image/jpeg;base64,${figure.b64}`} /> 
		</FlexBox>
	)
}

export default Figure
