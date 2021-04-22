import {FunctionComponent} from "react"
import {isCitationRef, isFigureRef, isRefChain, isText} from "src/common/util/guards"
import {ParagraphItem as TParagraphItem} from "src/common/types"
import Citation from "./Citation"
import CitationChain from "./CitationChain"
import Figure from "./Figure"

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
		return <Citation citationRef={item} />
	} else if (isRefChain(item)) {
		return <CitationChain refChain={item} />
	} else if (isFigureRef(item)) {
		return <Figure figureRef={item} />
	} else {
		console.error(`Invalid section item: ${item}`)
		return null
	}
}

export default ParagraphItem
