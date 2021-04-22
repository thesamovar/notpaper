import {FunctionComponent} from "react";
import FlexBox from "src/common/components/FlexBox";
import {Narrative as TNarrative} from "src/common/types";
import Section from "./Section";

interface NarrativeProps {
	narrative: TNarrative
}

/**
 * Renders the narrative of the paper, which is a series of paragraphs, citations, and figures
 *
 * @param narrative 		A sequence of references to paragraphs, citations, and figures
 */
const Narrative: FunctionComponent<NarrativeProps> = ({ narrative }) => (
	<FlexBox id="narrative" column>
			{
				narrative.map((section, i) => (
					<Section key={i} section={section} />
				))
			}
	</FlexBox>
)

export default Narrative
