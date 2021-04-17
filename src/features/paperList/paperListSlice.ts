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

// Types

export type Abstract = string
export interface AbstractPaper {
	abstract: Abstract
}


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
	activePaperId: undefined,
  papersById: {},
	loadingById: {},
	errorById: {}
}

// Thunks

/**
 * Send a document to the NotPaper API to be parsed
 */
export interface parseOnePayload { id: string, paper: AbstractPaper }
export interface parseOneParams { text: string, source: string}
export const parseOne = createAsyncThunk('paperList/parseOne', async ({text, source}: parseOneParams, { rejectWithValue }) => {
	const response = await apiService.parse(text, source)
	console.log(response)

	if (!response.paper) {
		rejectWithValue(`Invalid payload: missing paper`)
	}

	return response as parseOnePayload
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
		builder.addCase(parseOne.fulfilled, (state, { payload }) => {
			state.papersById[payload.id] = payload.paper
		})
	}
})


export const getAllPapers = (state: RootState) => Object.entries(state.paper.papersById)
export const getActivePaper = (state: RootState) => (
	state.paper.activePaperId ? state.paper.papersById[state.paper.activePaperId] : undefined
)
export const paperIsLoading = (id: string) => (state: RootState) => state.paper.loadingById[id]
export const paperHasError = (id: string) => (state: RootState) => state.paper.errorById[id]

export default paperSlice.reducer
