/**
 * FlexBox
 */

import {Flex, FlexProps} from "@theme-ui/components";
import {ThemeUICSSObject} from "@theme-ui/css";

interface FlexBoxProps extends FlexProps {
	column?: boolean
	sx?: ThemeUICSSObject
}

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
