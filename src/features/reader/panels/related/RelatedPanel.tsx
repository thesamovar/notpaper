/**
 * Related Panel
 */

import {Box} from "@theme-ui/components";
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

/**
 * Renders a related resource, by discriminating its kind and then choosing the correct Component
 *
 * @param resourceRef 	The resourceRef to be rendered
 *
 * @returns Citation 		The resourceRef is a CitationRef
 * @returns Figure 			The resourceRef is a FigureRef
 * @returns null 				The kind of the resourceRef is not valid
 */
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


/**
 * Renders the RelatedPanel, showing resources from the paper
 *
 * @returns RelatedResource 		A component which can discriminate and render the resource
 */
const RelatedPanel = () => {
	const resources = useSelector(selectRelatedResources)

	return (
		<Box sx={{ width: "50%", height: '100vh', p: 3, overflowY: 'scroll' }}>
			{
				resources.map((resource, i) => (
					<RelatedResource key={i} resource={resource} />
				))
			}
		</Box>
	)
}

export default RelatedPanel
