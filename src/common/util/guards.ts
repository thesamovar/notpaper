/**
 * Type Guards
 */

import {CitationRef, FigureRef, ParagraphRef, RefChain, RelatedResourceRef, ResourceRef} from "src/features/paperPicker/paperPickerSlice"


export const isText = (item: any): item is string => typeof item === "string"
export const isResourceRef = (item: any): item is ResourceRef => typeof item === "object" && "kind" in item && "id" in item

export const isCitationRef = (item: any): item is CitationRef => isResourceRef(item) && item.kind === "citation"
export const isParagraphRef = (item: any): item is ParagraphRef => isResourceRef(item) && item.kind === 'paragraph'
export const isFigureRef = (item: any): item is FigureRef => isResourceRef(item) && item.kind === 'figure'

export const isRelatedResourceRef = (item: any): item is RelatedResourceRef => isFigureRef(item) || isCitationRef(item)
export const isRefChain = <T extends ResourceRef>(item: any): item is RefChain<T> => (
	Array.isArray(item) && ((
		item.length === 0
	) || (
		'id' in item[0] && 'kind' in item[0]
	))
)
