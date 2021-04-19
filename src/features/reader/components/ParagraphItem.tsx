import {FunctionComponent} from "react"
import {isCitationRef, isText} from "src/common/util/guards"
import {ParagraphItem as TParagraphItem} from "src/features/paperPicker/paperPickerSlice"
import Citation from "./Citation"

interface ParagraphItemProps {
	item: TParagraphItem
}

/**
 * A constituent piece of a paragraph, which can be a string or a citation
 *
 * @param item 			A string of text, or a citation reference
 */
const ParagraphItem: FunctionComponent<ParagraphItemProps> = ({ item }) => {
	if (isText(item)) {
		return (
			<>
				{item}
			</>
		) 
	} else if (isCitationRef(item)) {
		return <Citation id={item.id} />
	} else {
		console.error(`Invalid section item: ${item}`)
		return null
	}
}

export default ParagraphItem
