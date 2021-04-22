import {FunctionComponent} from "react";
import FlexBox from "src/common/components/FlexBox";
import {Narrative as TNarrative} from "src/common/types";
import Section from "./Section";

interface NarrativeProps {
	narrative: TNarrative
}

/**
 * Renders the narrative of the paper, which is a series of sections that contain paragraphs
 *
 * @param narrative 		A sequence Sections, referencing paragraphs
 * @returns 						A FlexBox containing one Section per-paragraph
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
