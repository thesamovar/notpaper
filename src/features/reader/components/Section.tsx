import {FunctionComponent} from "react";
import FlexBox from "src/common/components/FlexBox";
import {Section as TSection} from "src/features/paperPicker/paperPickerSlice";
import SectionItem from "./SectionItem";

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
			section.content.map((item, i) => (
				<SectionItem key={i} item={item} />
			))
		}
	</FlexBox>
)

export default Section
