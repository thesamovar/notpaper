/**
 * Paper Types
 *
 * This is the definition of the AbstractPaper data format. It's easiest to start
 * 	at the bottom of the file with AbstractPaper, and work your way upwards.
 */

type ID = string

// Resource Reference Types
export interface ResourceRef {
  kind: 'citation' | 'figure' | 'paragraph'
  id: ID
}
export interface CitationRef extends ResourceRef {
  kind: 'citation'
}

export interface FigureRef extends ResourceRef {
  kind: 'figure'
}

export interface ParagraphRef extends ResourceRef {
  kind: 'paragraph'
}

// Resource Reference Utility Types

export type RelatedResourceRef = CitationRef | FigureRef
export type RefChain<T extends ResourceRef> = T[]
export type CanHover = RelatedResourceRef
export type CanPin = RelatedResourceRef
export type ResourceKey = keyof Resources
export type RelatedResourceKind = Exclude<ResourceKey, 'paragraph'>

// Resource Contents Types

export type ParagraphItem =
  | string
  | CitationRef
  | RefChain<CitationRef>
  | FigureRef
export interface Paragraph {
  id: ID
  content: ParagraphItem[]
}

export type Figure = {
  id: ID
  b64: string
  shortForm: string
}

export type Citation = {
  id: ID
  text: string
  shortForm: string
}

export type Section = {
  title: string
  paragraphs: RefChain<ParagraphRef>
}

// AbstractPaper Top-Level Types

export type Abstract = string
export type Author = string
export type Narrative = Section[]
export type Resources = {
  paragraph: { [i: string]: Paragraph }
  figure: { [i: string]: Figure }
  citation: { [i: string]: Citation }
}

// AbstractPaper Type

export interface AbstractPaper {
  title: string
  abstract: Abstract
  authors: Author[]
  narrative: Narrative
  resources: Resources
}
