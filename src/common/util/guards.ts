/**
 * Type Guards
 */

import {CitationRef, FigureRef, ParagraphItem, ParagraphRef, ResourceRef, SectionItem} from "src/features/paperPicker/paperPickerSlice"


export const isText = (item: ParagraphItem): item is string => typeof item == "string"
export const isCitationRef = (item: ParagraphItem | ResourceRef): item is CitationRef => (item as ResourceRef).kind === "citation"
export const isParagraphRef = (item: ResourceRef): item is ParagraphRef => item.kind == 'paragraph'
export const isFigureRef = (item: ResourceRef): item is FigureRef => item.kind == 'figure'
