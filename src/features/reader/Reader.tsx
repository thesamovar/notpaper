/**
 * Reader Component
 */

import {Box} from "@theme-ui/components"
import {ReactNode} from "react"
import {useSelector} from "react-redux"
import {getActivePaper} from "../paperPicker/paperPickerSlice"
import MainPanel from "./components/panels/MainPanel"
import RelatedPanel from "./components/panels/RelatedPanel"


export interface ReaderProps {
	panels: ReactNode[]
}
const Reader = () => {

	const activePaper = useSelector(getActivePaper)

	if (!activePaper) {
		throw new Error(`activePaper is undefined!`)
	}

	return (
		<Box id="reader" sx={{ display: "flex" }}>
			<MainPanel paper={activePaper} />
			<RelatedPanel />
		</Box>
	)
}

export default Reader