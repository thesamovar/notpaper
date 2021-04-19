import {FunctionComponent} from "react";
import FlexBox from "src/common/components/FlexBox";

interface AbstractProps {
	abstract: string
}

/**
 * Renders the abstract of the research paper.
 *
 * @param abstract 		The string text of the abstract.
 */
const Abstract: FunctionComponent<AbstractProps> = ({ abstract }) => (
	<FlexBox as="section" id="abstract" column>
		<h2>Abstract</h2>
		<p>{abstract}</p>
	</FlexBox>
)

export default Abstract
