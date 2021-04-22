import {FunctionComponent} from "react";
import FlexBox from "src/common/components/FlexBox";
import {Section as TSection} from "src/common/types";
import Paragraph from "./Paragraph";

interface SectionProps {
	section: TSection
}

/**
 * A section of the narrative of the paper
 *
 * @param section 		A data structure containing a title and a sequence of resources (e.g. paragraphs)
 */
const Section: FunctionComponent<SectionProps> = ({ section }) => (
	<FlexBox as="section" column>
		<h2>{section.title}</h2>
		{
			section.paragraphs.map((ref, i) => (
				<Paragraph key={i} paragraphRef={ref} />
			))
		}
	</FlexBox>
)

export default Section
