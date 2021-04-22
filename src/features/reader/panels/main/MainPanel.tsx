import {Heading} from "@theme-ui/components"
import FlexBox from "src/common/components/FlexBox"
import {AbstractPaper} from "src/common/types"
import Abstract from "./Abstract"
import Authors from "./Authors"
import Narrative from "./Narrative"


interface MainPanelProps {
	paper: AbstractPaper
}

/**
 * The main reading panel.
 *
 * @param paper 		The paper the user is reading
 * @returns 				A vertical FlexBox containing each part of the paper
 */
const MainPanel = ({ paper }: MainPanelProps) => {
	return (
		<FlexBox 
			column 
			sx={{ 
				px: 6,
				width: "50%", 
				overflowY: 'auto', 
				height: '100vh' 
			}}
		>
			<Heading>{paper.title}</Heading>
			<Authors {...paper} />
			<Abstract {...paper} />
			<Narrative {...paper} />
		</FlexBox>
	)
}

export default MainPanel
