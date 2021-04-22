/**
 * Related Panel
 */

import {Box} from "@theme-ui/components";
import _ from "lodash";
import {FunctionComponent} from "react";
import {useSelector} from "react-redux";
import {isCitationRef, isFigureRef} from "src/common/util/guards";
import {RelatedResourceRef} from "src/common/types";
import {selectRelatedResources} from "../../readerSlice";
import Citation from "./Citation";
import Figure from "./Figure";


interface RelatedResourceProps {
	resource: RelatedResourceRef
}
const RelatedResource: FunctionComponent<RelatedResourceProps> = ({ resource }) => {
	if (isCitationRef(resource)) {
		return <Citation citationRef={resource} />
		} else if (isFigureRef(resource)) {
			return <Figure figureRef={resource} />
		} else {
			console.error(`Invalid RelatedResource: ${resource}`)
			return null
		}
}


const RelatedPanel = () => {
	const resources = useSelector(selectRelatedResources)

	return (
		<Box sx={{ width: "50%", p: 3 }}>
			{
				resources.map((resource, i) => (
					<RelatedResource key={i} resource={resource} />
				))
			}
		</Box>
	)
}

export default RelatedPanel
