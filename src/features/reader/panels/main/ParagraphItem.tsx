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
 * A constituent piece of a paragraph, which can be a string, citation, or chain of citations
 *
 * @param item 							A string of text, a citation, or a chain of citations
 *
 * @returns Citation 				The item is a ref of kind 'citation' 
 * @returns CitationChain 	The item is a chain of 'citation' refs
 * @returns Figure 					The item is a ref of kind 'figure' 
 * @returns null 						The item is not a valid ref
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
