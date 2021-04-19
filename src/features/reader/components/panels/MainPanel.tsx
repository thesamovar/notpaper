import FlexBox from "src/common/components/FlexBox"
import {AbstractPaper} from "src/features/paperPicker/paperPickerSlice"
import Abstract from "../Abstract"
import Header from "../Header"
import Narrative from "../Narrative"


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
		<FlexBox column sx={{ width: "50%", overflowY: 'auto', height: '100vh' }}>
			<Header {...paper} />
			<Abstract {...paper} />
			<Narrative {...paper} />
		</FlexBox>
	)
}

export default MainPanel
