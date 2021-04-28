/**
 * State-Slice for Paper
 *
 * State:
 *     activePaperId:   The id of the currently selected paper
 *     papersById: 			Papers indexed by their ID
 *     loadingById: 		The loading status of papers by ID (useful for API calls)
 *     errorById: 			The error status of papers by ID (i.e. if an API call to load a paper fails)
 *
 * Actions:
 *     selectPaper:     When a paper is selected for reading
 *
 */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'src/app/store'
import { AbstractPaper, ResourceKey } from 'src/common/types'
import apiService from 'src/service/api'
import { TEST_PAPER } from './testPaper'

///////////////////
//     STATE     //
///////////////////

export interface PaperListState {
  activePaperId?: string
  papersById: {
    [n: string]: AbstractPaper
  }
  loadingById: {
    [n: string]: boolean
  }
  errorById: {
    [n: string]: boolean | string
  }
}

const initialState: PaperListState = {
  activePaperId: 'test',
  papersById: {
    test: TEST_PAPER,
  },
  loadingById: {},
  errorById: {},
}

////////////////////
//     THUNKS     //
////////////////////

interface UploadPayload {
  id: string
  paper: AbstractPaper
}

interface UploadParams {
  text: string
  source: string
}

/**
 * Send a document to the NotPaper API to be parsed
 *
 * @param text: 		The LaTeX document's text as a string
 * @param source: 	The type of document (e.g. latex)
 */
export const upload = createAsyncThunk(
  'paperList/parseOne',
  async ({ text, source }: UploadParams, { rejectWithValue }) => {
    const response = await apiService.parse(text, source)

    if (!response.paper) {
      rejectWithValue(`Invalid payload: missing paper`)
    }

    return response as UploadPayload
  },
)

///////////////////
//     SLICE     //
///////////////////

export const paperSlice = createSlice({
  name: 'paper',
  initialState,
  reducers: {
    selectPaper: (state, action: PayloadAction<string>) => {
      state.activePaperId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(upload.fulfilled, (state, { payload }) => {
      state.papersById[payload.id] = payload.paper
    })
  },
})

/////////////////////
//     ACTIONS     //
/////////////////////

export const { selectPaper } = paperSlice.actions

///////////////////////
//     SELECTORS     //
///////////////////////

/**
 * Retrieve a resource in a paper
 *
 * @param paper 				An AbstractPaper object
 * @param resource 			The type of resource (e.g. citation)
 * @param thingId 			The ID of the resource
 *
 * @returns 						A curried function, which can be applied like thingInPaperId()()()
 */
const thingInPaperById = (paper: AbstractPaper) => (resource: ResourceKey) => (
  thingId: string,
) => paper.resources[resource][thingId]

/**
 * Retrieve a resource in the active paper
 *
 * @param resource 		The kind of resource (e.g. citation)
 * @param thingId 		The ID of the resource
 * @param state 			The Redux state object
 *
 * @returns 					A curried function, which can be applied twice and then passed into useSelector
 * 											e.g. useSelector(thingInActivePaperById('citation')('cit1'))
 */
const thingInActivePaperById = (resource: ResourceKey) => (thingId: string) => (
  state: RootState,
) => {
  const paper = getActivePaper(state)
  if (!paper) {
    return undefined
  }

  return thingInPaperById(paper)(resource)(thingId)
}

/**
 * Retrieve several resources from the active paper
 *
 * @param resource 		The kind of resource (e.g. citation)
 * @param thingIds 		The IDs of the resources
 * @param state 			The Redux state object
 *
 * @returns 					A curried function, which can be applied twice and then passed into useSelector
 * 											e.g. useSelector(thingInActivePaperById('citation')(['cit1', 'cit2']))
 */
const thingsInActivePaperById = (resource: ResourceKey) => (
  thingIds: string[],
) => (state: RootState) => {
  const paper = getActivePaper(state)
  if (!paper) {
    return undefined
  }

  return thingIds.map((id) => thingInPaperById(paper)(resource)(id))
}

/**
 * Select all loaded papers
 *
 * @param state     The root state object
 */
export const getAllPapers = (state: RootState) =>
  Object.entries(state.paper.papersById)

/**
 * Select the IDs of all loaded papers
 *
 * @param state     The root state object
 */
export const getAllPaperIds = (state: RootState) =>
  Object.keys(state.paper.papersById)

/**
 * Select the active paper's ID
 *
 * @param state     The root state object
 */
export const getActivePaperId = (state: RootState) => state.paper.activePaperId

/**
 * Select the active paper
 *
 * @param state     The root state object
 */
export const getActivePaper = (state: RootState) =>
  state.paper.activePaperId
    ? state.paper.papersById[state.paper.activePaperId]
    : undefined

/**
 * Select the loading status of a paper
 *
 * @param id        The ID of the paper
 * @param state     The root state object
 */
export const paperIsLoading = (id: string) => (state: RootState) =>
  state.paper.loadingById[id]

/**
 * Select the error status of a paper
 *
 * @param id        The ID of the paper
 * @param state     The root state object
 */
export const paperHasError = (id: string) => (state: RootState) =>
  state.paper.errorById[id]

/**
 * Select a paragraph by ID
 *
 * @param thingId   The ID of the paragraph
 * @param state     The root state object
 */
export const paragraphById = (thingId: string) =>
  thingInActivePaperById('paragraph')(thingId)

/**
 * Select a figure by ID
 *
 * @param thingId   The ID of the paper
 * @param state     The root state object
 */
export const figureById = (thingId: string) =>
  thingInActivePaperById('figure')(thingId)

/**
 * Select a citation by ID
 *
 * @param thingId   The ID of the citation
 * @param state     The root state object
 */
export const citationById = (thingId: string) =>
  thingInActivePaperById('citation')(thingId)

/**
 * Select several citations by ID
 *
 * @param ids       An array of citation IDs
 * @param state     The root state object
 */
export const citationsById = (ids: string[]) =>
  thingsInActivePaperById('citation')(ids)

/////////////////////
//     REDUCER     //
/////////////////////

export default paperSlice.reducer
