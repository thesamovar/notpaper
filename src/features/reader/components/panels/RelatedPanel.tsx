/**
 * Related Panel
 */

import {Box} from "@theme-ui/components";
import _ from "lodash";
import {FunctionComponent} from "react";
import {useDispatch, useSelector} from "react-redux";
import FlexBox from "src/common/components/FlexBox";
import {isCitationRef, isFigureRef} from "src/common/util/guards";
import {Citation as TCitation, citationById, CitationRef, RelatedResourceRef} from "src/features/paperPicker/paperPickerSlice";
import {pinResource, resourceHasHover, resourceIsPinned, selectRelatedResources} from "../../readerSlice";

interface CitationProps {
	resopurceRef: CitationRef
}

const Citation: FunctionComponent<CitationProps> = ({ resopurceRef }) => {
	const dispatch = useDispatch()
	const citation = useSelector(citationById(resopurceRef.id)) as TCitation
	const hasHover = useSelector(resourceHasHover(resopurceRef))
	const isPinned = useSelector(resourceIsPinned(resopurceRef))

	const onClick = () => {
		dispatch(pinResource({ ...resopurceRef, isPinned: !isPinned }))
	}

	return (
		<FlexBox 
			sx={{ p: 3, border: '1px solid black', backgroundColor: hasHover ? 'green' : 'transparent' }}
			onClick={onClick}
		>
			{ citation.text }
		</FlexBox>
	)
}

interface RelatedResourceProps {
	resource: RelatedResourceRef
}
const RelatedResource: FunctionComponent<RelatedResourceProps> = ({ resource }) => {
	if (isCitationRef(resource)) {
		return <Citation resopurceRef={resource} />
		} else if (isFigureRef(resource)) {
			return null
		} else {
			console.error(`Invalid RelatedResource: ${resource}`)
			return null
		}
}


const RelatedPanel = () => {
	const resources = useSelector(selectRelatedResources)

	return (
		<Box sx={{ width: "50%" }}>
			{
				resources.map((resource, i) => (
					<RelatedResource key={i} resource={resource} />
				))
			}
		</Box>
	)
}

export default RelatedPanel
