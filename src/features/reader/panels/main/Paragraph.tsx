import {FunctionComponent} from "react"
import {useSelector} from "react-redux"
import {Paragraph as TParagraph, ParagraphRef} from "src/common/types"
import { paragraphById } from "src/features/paper/paperSlice"
import ParagraphItem from "./ParagraphItem"

interface ParagraphProps {
	paragraphRef: ParagraphRef
}

/**
 * A paragraph of text in a paper.
 *
 * This is comprised of abstract "paragraph items", to allow for citation components to be embedded.
 * @param paragraphRef 			The paragraph to be rendered
 * @returns 								The paragraph's contents which is a series of strings and ResourceRefs
 */
const Paragraph: FunctionComponent<ParagraphProps> = ({ paragraphRef }) => {
	const paragraph = useSelector(paragraphById(paragraphRef.id)) as TParagraph

	return (
		<p>
			{
				paragraph.content.map((item, i) => (
					<ParagraphItem key={i} item={item} />
				))
			}
		</p>
	)
}

export default Paragraph
