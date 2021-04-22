import FlexBox from "src/common/components/FlexBox"
import {AbstractPaper} from "src/common/types"
import Abstract from "./Abstract"
import Authors from "./Authors"
import Narrative from "./Narrative"


interface MainPanelProps {
	paper: AbstractPaper
}

/**
 * The main reading panel, on the left-hand side
 *
 * @param paper 		The paper the user is reading
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
			<h1>{paper.title}</h1>
			<Authors {...paper} />
			<Abstract {...paper} />
			<Narrative {...paper} />
		</FlexBox>
	)
}

export default MainPanel
