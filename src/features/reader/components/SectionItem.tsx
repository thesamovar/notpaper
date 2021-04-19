import {FunctionComponent} from "react"
import {isFigureRef, isParagraphRef} from "src/common/util/guards"
import {SectionItem as TSectionItem} from "src/features/paperPicker/paperPickerSlice"
import Paragraph from "./Paragraph"

interface SectionItemProps {
	item: TSectionItem
}

/**
 * A "piece" of a section of a paper, which currently can be a paragraph or a figure
 *
 * @param item 			A reference to a paragraph or a figure
 * @throws Error 		The item is not a paragraph ref or figure ref
 */
const SectionItem: FunctionComponent<SectionItemProps> = ({ item }) => {
	if (isParagraphRef(item)) {
		return (
			<Paragraph id={item.id} />
		)
	} else if (isFigureRef(item)) {
		throw new Error(`Figure not implemented yet.`)
	} else {
		throw new Error(`Invalid SectionItem: ${item}`)
	}
}

export default SectionItem
