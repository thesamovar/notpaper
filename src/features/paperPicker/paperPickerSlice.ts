/**
 * Redux Slice for Paper List
 *
 * State:
 *     activePaperId:   The id of the currently selected paper
 *
 * Actions:
 *     selectPaper:     When a paper is selected for reading
 */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {RootState} from 'src/app/store'
import apiService from 'src/service/api'

// Types ////////////////////////////////////////

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

// Components of a Section

export type SectionItem  = ParagraphRef | FigureRef
export type Section = {
	title: string,
	content: SectionItem[]
}

export type ParagraphItem = string | CitationRef
export interface Paragraph {
	id: ID
	content: ParagraphItem[]
}

export type Figure = {
	id: ID
	b64: string
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


// State

const TEST_PAPER: AbstractPaper = {
	title: "Towards a tarring of your driveway",
	abstract: "Some abstract",
	authors: [
		"Rory Byrne",
		"Ryor Yrneb",
		"Bory Ryrne"
	],
	narrative: [
		{
			title: "First Section",
			content: [
				{
					kind: 'paragraph',
					id: 'par1'
				},
				{
					kind: 'paragraph',
					id: 'par2'
				},
				{
					kind: 'paragraph',
					id: 'par3'
				},
				{
					kind: 'paragraph',
					id: 'par4'
				},
			]
		},
	],
	resources: {
		paragraph: {
			'par1': {
				id: 'par1',
				content: [
					`
					The brain is known to be deeply heterogeneous at all scales (Koch and Laurent 1999), but it is still not known whether this heterogeneity plays an important functional role or if it is just a byproduct of noisy developmental processes and contingent evolutionary history. A number of hypothetical roles have been suggested (reviewed in (Gjorgjieva, Drion, and Marder 2016)), in efficient coding (Shamir and Sompolinsky 2006; Chelaru and Dragoi 2008; Osborne et al. 2008; Marsat and Maler 2010; Padmanabhan and Urban 2010; Hunsberger, Scott, and Eliasmith 2014; Zeldenrust, Gutkin, and Denéve 2019), reliability (Lengler 2013), working memory (Kilpatrick, Ermentrout, and Doiron 2013), and functional specialisation 
					`,
					{
						kind: 'citation',
						id: 'cit1'
					},
					`
However, previous studies have largely used simplified tasks or networks, and it remains unknown whether or not heterogeneity can help animals solve complex information processing tasks in natural environments. Recent work has allowed us, for the first time, to train biologically realistic spiking neural networks to carry out these tasks at a high level of performance, using methods derived from machine learning. We used two different learning models (Nicola and Clopath 2017; Neftci, Mostafa, and Zenke 2019) to investigate the effect of introducing heterogeneity in the time scales of neurons when performing tasks with realistic and complex temporal structure. We found that it improves overall performance, makes learning more stable and robust, and learns neural parameter distributions that match experimental observations, suggesting that the heterogeneity observed in the brain may be a vital component to its ability to adapt to new environments.
					`
				]
			},
			'par2': {
				id: 'par2',
				content: [
					`
					We investigated the role of neural heterogeneity in task performance by training recurrent spiking neural networks to classify visual and auditory stimuli with varying degrees of temporal structure. The model used three layers of spiking neurons: an input layer, a recurrently connected layer, and a readout layer used to generate predictions (1A), a widely used minimal architecture (e.g. Maass, Natschläger, and Markram (2002; Neftci, Mostafa, and Zenke 2019)). Heterogeneity was introduced by giving each neuron an individual membrane and synaptic time constant. We compared four different conditions: initial values could be either homogeneous or heterogeneous, and training could be either standard or heterogeneous (1B). Time constants were either initialised with a single value (homogeneous initialisation), or randomly according to a gamma distribution (heterogeneous). The models were trained using surrogate gradient descent `
					,
					{
						kind: 'citation',
						id: 'cit2'
					},
					`. Synaptic weights were always plastic, while time constants were either held fixed at their initial values in the standard training regime, or could be modified in the heterogeneous training regime.
					`
				]
			},
			'par3': {
				id: 'par3',
				content: [
					`
We used five different datasets with varying degrees of temporal structure. Neuromorphic MNIST (N-MNIST; Orchard et al. (2015)), Fashion-MNIST (F-MNIST; Xiao, Rasul, and Vollgraf (2017), and the DVS128 Gesture dataset (Amir et al. 2017) feature visual stimuli, while the Spiking Heidelberg Digits (SHD) and Spiking Speech Commands (SSC) datasets (Cramer et al. 2020) are auditory. N-MNIST and DVS128 use a neuromorphic vision sensor to generate spiking activity, by moving the sensor with a static visual image of handwritten digits (N-MNIST) or by recording humans making hand gestures (DVS128). F-MNIST is a dataset of static images that is widely used in machine learning, which we converted into spike times by treating the image intensities as input currents to model neurons, so that higher intensity pixels would lead to earlier spikes, and lower intensity to later spikes. Both SHD and SSC use a detailed model of the activity of bushy cells in the cochlear nucleus, in response to spoken digits (SHD) or commands (SSC). Of these datasets, N-MNIST and F-MNIST have minimal temporal structure, as they are generated from static images. DVS128 has some temporal structure as it is recorded motion, but it is possible to perform well at this task by discarding the temporal information. The auditory tasks SHD and SSC by contrast have very rich temporal structure.
					`,
				]
			},
			'par4': {
				id: 'par4',
				content: [
					`
We found that heterogeneity in time constants had a profound impact on performance on those training datasets where information was encoded in the precise timing of input spikes (1, 2A). On the most temporally complex auditory tasks, accuracy improved by a factor of around 15-20%, while for the least temporally complex task N-MNIST we saw no improvement at all. For the gesture dataset DVS128 we can identify the source of the (intermediate) improvement as the heterogeneous models being better able to distinguish between spatially similar but temporally different gestures, such as clockwise and anticlockwise versions of the same gesture (See Supp. 6A-B). `,
					{
						kind: 'citation',
						id: 'cit3'
					},
`This suggests that we might see greater improvements for a richer version of this dataset in which temporal structure was more important.
					`
				]
			},
		},
		figure: {
			'fig1': { 
				id: 'fig1',
				b64: '...'
			}
		},
		citation: {
			'cit1': {
				id: 'cit1',
				text: 'Duarte, Renato, and Abigail Morrison. 2019. “Leveraging Heterogeneity for Neural Computation with Fading Memory in Layer 2/3 Cortical Microcircuits.” PLoS Computational Biology 15 (4): e1006781. ',
				shortForm: '(Duarte and Morrison 2019)'
			},
			'cit2': {
				id: 'cit2',
				text: 'cit2',
				shortForm: '(Neftci, Mostafa, and Zenke 2019)'
			},
			cit3: {
				id: 'cit3',
				text: 'blah blah',
				shortForm: '(Bory Ryrne, Yorr Enyrb, 2021)'
			}
		}
	}
}

export interface PaperListState {
	activePaperId?: string
  papersById: {
    [n: string]: AbstractPaper
  },
	loadingById: {
		[n: string]: boolean
	},
	errorById: {
		[n: string]: boolean | string
	}
}

const initialState: PaperListState = {
	activePaperId: 'test',
	papersById: {
		test: TEST_PAPER
	},
	loadingById: {},
	errorById: {}
}

// Thunks

/**
 * Send a document to the NotPaper API to be parsed
 */
export interface uploadPayload { id: string, paper: AbstractPaper }
export interface uploadParams { text: string, source: string}
export const upload = createAsyncThunk('paperList/parseOne', async ({text, source}: uploadParams, { rejectWithValue }) => {
	console.log("UPLOADING NOW")
	const response = await apiService.parse(text, source)
	console.log(response)

	if (!response.paper) {
		rejectWithValue(`Invalid payload: missing paper`)
	}

	return response as uploadPayload
})


// Slice

export const paperSlice = createSlice({
  name: 'paper',
  initialState,
	reducers: {
		selectPaper: (state, action: PayloadAction<string>) => {
			state.activePaperId = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(upload.fulfilled, (state, { payload }) => {
			state.papersById[payload.id] = payload.paper
		})
	}
})

export type Maybe<T> = T | undefined


export const getAllPapers = (state: RootState) => Object.entries(state.paper.papersById)
export const getAllPaperIds = (state: RootState) => Object.keys(state.paper.papersById)
export const getActivePaperId = (state: RootState) => state.paper.activePaperId
export const getActivePaper = (state: RootState) => (
	state.paper.activePaperId ? state.paper.papersById[state.paper.activePaperId] : undefined
)
export const paperIsLoading = (id: string) => (state: RootState) => state.paper.loadingById[id]
export const paperHasError = (id: string) => (state: RootState) => state.paper.errorById[id]
const thingInPaperById = (paperId: string) => (resource: ResourceKeys) => (thingId: string) => (state: RootState) => (
	state.paper.papersById[paperId].resources[resource][thingId]
)
const thingInActivePaperById = (resource: ResourceKeys) => (thingId: string) => (state: RootState) => {
	const paperId = state.paper.activePaperId
	if (!paperId) {
		return undefined
	}

	return thingInPaperById(paperId)(resource)(thingId)(state)
}
// TODO: How can we make these typesafe?
export const paragraphById = (thingId: string) => thingInActivePaperById('paragraph')(thingId)
export const figureById = (thingId: string) => thingInActivePaperById('figure')(thingId)
export const citationById = (thingId: string) => thingInActivePaperById('citation')(thingId)


export default paperSlice.reducer
