/**
 * FlexBox
 */

import {Flex, FlexProps} from "@theme-ui/components";
import {ThemeUICSSObject} from "@theme-ui/css";

interface FlexBoxProps extends FlexProps {
	column?: boolean
	sx?: ThemeUICSSObject
}

/**
 * A wrapper around Flex, allowing us to easily create a `column` FlexBox
 *
 * @param column 			Whether or not to set FlexDirection to 'column'
 * @param sx 					A special Theme-UI parameter which maps to CSS properties
 * @param ...props 		The rest of the parameters specified by FlexProps above ^
 *
 * @returns 					A FlexBox
 */
const FlexBox = ({ column, sx, ...props }: FlexBoxProps) => (
	<Flex 
		{...props} 
		sx={{
			...sx,
			display: "flex",
			flexDirection: column ? "column" : "row",
		}}
	/>
)

export default FlexBox
