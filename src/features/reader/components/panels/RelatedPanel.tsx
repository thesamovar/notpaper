/**
 * Related Panel
 */

import {Box} from "@theme-ui/components";
import {FunctionComponent} from "react";
import {useDispatch, useSelector} from "react-redux";
import FlexBox from "src/common/components/FlexBox";
import {isCitationRef, isFigureRef} from "src/common/util/guards";
import {Citation as TCitation, citationById, RelatedResourceRef} from "src/features/paperPicker/paperPickerSlice";
import {pinResource, resourceHasHover, resourceIsPinned, selectRelatedResources} from "../../readerSlice";

const CITATION = 'citation'

interface CitationProps {
	id: string
}

const Citation: FunctionComponent<CitationProps> = ({ id }) => {
	const dispatch = useDispatch()
	const citation = useSelector(citationById(id)) as TCitation
	const hasHover = useSelector(resourceHasHover(id, CITATION))
	const isPinned = useSelector(resourceIsPinned(id, CITATION))

	const onClick = () => {
		dispatch(pinResource({ id, kind: CITATION, isPinned: !isPinned }))
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
		return <Citation id={resource.id} />
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
