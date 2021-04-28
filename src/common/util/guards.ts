/**
 * Type Guards
 */

import {
  CitationRef,
  FigureRef,
  ParagraphRef,
  RefChain,
  RelatedResourceRef,
  ResourceRef,
} from 'src/common/types'

/**
 * Is the item of type string
 *
 * @param item      A possible string
 */
export const isText = (item: any): item is string => typeof item === 'string'

/**
 * Is the item a ResourceRef type
 *
 * @param item      A possible ResourceRef
 */
export const isResourceRef = (item: any): item is ResourceRef =>
  typeof item === 'object' && 'kind' in item && 'id' in item

/**
 * Is the item a CitationRef type
 *
 * @param item      A possible CitationRef
 */
export const isCitationRef = (item: any): item is CitationRef =>
  isResourceRef(item) && item.kind === 'citation'

/**
 * Is the item a ParagraphRef type
 *
 * @param item      A possible ParagraphRef
 */
export const isParagraphRef = (item: any): item is ParagraphRef =>
  isResourceRef(item) && item.kind === 'paragraph'

/**
 * Is the item a FigureRef type
 *
 * @param item      A possible FigureRef
 */
export const isFigureRef = (item: any): item is FigureRef =>
  isResourceRef(item) && item.kind === 'figure'

/**
 * Is the item a RelatedResourceRef type
 *
 * @param item      A possible RelatedResourceRef
 */
export const isRelatedResourceRef = (item: any): item is RelatedResourceRef =>
  isFigureRef(item) || isCitationRef(item)

/**
 * Is the item a RefChain type
 *
 * @param item      A possible RefChain
 */
export const isRefChain = <T extends ResourceRef>(
  item: any,
): item is RefChain<T> =>
  Array.isArray(item) &&
  (item.length === 0 || ('id' in item[0] && 'kind' in item[0]))
