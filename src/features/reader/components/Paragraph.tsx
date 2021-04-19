import {FunctionComponent} from "react"
import {useSelector} from "react-redux"
import {Paragraph as TParagraph, paragraphById} from "src/features/paperPicker/paperPickerSlice"
import ParagraphItem from "./ParagraphItem"

interface ParagraphProps {
	id: string
}

/**
 * A paragraph of text in a paper.
 *
 * This is comprised of abstract "paragraph items", to allow for citation components to be embedded.
 * @param id 			The id of the paragraph to be rendered
 */
const Paragraph: FunctionComponent<ParagraphProps> = ({ id }) => {
	const paragraph = useSelector(paragraphById(id)) as TParagraph

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
