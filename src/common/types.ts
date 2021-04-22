/**
 * Types
 */ 

export type Optional<T> = T | undefined

// Paper ////////////////////////////////////////

export type Abstract = string
export type Author = string
export type ID = string

// Resources
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

export type RelatedResourceRef = CitationRef | FigureRef
export type RefChain<T extends ResourceRef> = T[]
export type CanHover = RelatedResourceRef
export type CanPin = RelatedResourceRef

// Components of a Section

export type Section = {
	title: string,
	paragraphs: RefChain<ParagraphRef>
}

export type ParagraphItem = string | CitationRef | RefChain<CitationRef> | FigureRef
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

export type Narrative = Section[]

export type Resources = {
	paragraph: { [i: string]: Paragraph }
	figure: { [i: string]: Figure }
	citation: { [i: string]: Citation }

}
export interface AbstractPaper {
	title: string
	abstract: Abstract
	authors: Author[]
	narrative: Narrative
	resources: Resources
}
export type ResourceKeys = keyof Resources
export type RelatedResourceKind = Exclude<ResourceKeys, 'paragraph'>


type NarrativeStep = {
	kind: 'concept' | 'question' | 'figure'
	id: string
}
type AbstractResearch = {
	questions: string[]
	concepts: string[]
	arguments: string[]
	figures: { [i: string]: Figure }
	narrative: NarrativeStep[]
	references: Citation
}

