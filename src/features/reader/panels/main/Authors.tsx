import {Box} from "@theme-ui/components";
import FlexBox from "src/common/components/FlexBox";
import {Author} from "src/common/types";

interface AuthorsProps {
	authors: Author[]
}

/**
 * Renders the authors of the paper
 *
 * @param authors 	An array of author references
 * @returns 				A FlexBox containing one Box per-author
 */
const Authors = ({ authors }: AuthorsProps) => (
	<FlexBox as="div" id="authors">
		{
			authors.map(author => (
				<Box sx={{ p: 2 }} key={author}>{author}</Box>
			))
		}
	</FlexBox>
)

export default Authors
