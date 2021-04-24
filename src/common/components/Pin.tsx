import {Box} from "@theme-ui/components"
import {ThemeUICSSObject} from "@theme-ui/css"
import {FunctionComponent, MouseEvent, useState} from "react"
import {FaThumbtack} from "react-icons/fa"


interface PinProps {
	onClick: (e: MouseEvent) => void
	sx?: ThemeUICSSObject
}

/**
 * Renders a pin icon.
 *
 * @param onClick 		Function to run when the icon is clicked
 * @param sx 					Theme UI `sx` parameter for styling
 */
const Pin: FunctionComponent<PinProps> = ({ onClick, sx }) => {
	const [hasHover, setHasHover] = useState(false)

	return (
		<Box
			onClick={onClick}
			sx={{
				position: 'absolute',
				top: '-5px',
				right: '-5px',
				cursor: 'pointer',
				transform: 'rotate(45deg)',
				borderRadius: '50%',
				border: '1px solid black',
				width: '25px',
				height: '25px',
				textAlign: 'center',
				backgroundColor: hasHover ? 'yellow' : 'lightgreen',
				...sx
			}} 
			onMouseEnter={() => setHasHover(true)}
			onMouseLeave={() => setHasHover(false)}
		>
			<FaThumbtack style={{ rotate: '45deg' }} />
		</Box>
		)
}

export default Pin
