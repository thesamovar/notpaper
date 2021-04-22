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
import { AbstractPaper, ResourceKeys as ResourceKey } from 'src/common/types'
import apiService from 'src/service/api'
import {TEST_PAPER} from './testPaper'

// State

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
const thingInPaperById = (paper: AbstractPaper) => (resource: ResourceKey) => (thingId: string) => (
	paper.resources[resource][thingId]
)
const thingInActivePaperById = (resource: ResourceKey) => (thingId: string) => (state: RootState) => {
	const paper = getActivePaper(state)
	if (!paper) {
		return undefined
	}

	return thingInPaperById(paper)(resource)(thingId)
}
const thingsInActivePaperById = (resource: ResourceKey) => (thingIds: string[]) => (state: RootState) => {
	const paper = getActivePaper(state)
	if (!paper) {
		return undefined
	}

	return thingIds.map(id => thingInPaperById(paper)(resource)(id))
}

// TODO: How can we type these?
export const paragraphById = (thingId: string) => thingInActivePaperById('paragraph')(thingId)
export const figureById = (thingId: string) => thingInActivePaperById('figure')(thingId)
export const citationById = (thingId: string) => thingInActivePaperById('citation')(thingId)
export const citationsById = (ids: string[]) => thingsInActivePaperById('citation')(ids)

export default paperSlice.reducer
