import FlexBox from "src/common/components/FlexBox";
import {Author} from "src/common/types";

interface HeaderProps {
	title: string
	authors: Author[]
}

/**
 * The header of the paper, rendering the title and the authors.
 *
 * @param title 		The title of the research paper
 * @param authors 	An array of author references
 */
const Header = ({ title, authors }: HeaderProps) => (
	<FlexBox as="header" id="header" column>
		{
			authors.map(author => (
				<p key={author}>{author}</p>
			))
		}
	</FlexBox>
)

export default Header
