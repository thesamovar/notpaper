/*
 * Redux Slice for the Paper component
 *
 * State:
 *     activePaperId:   The id of the currently selected paper
 *
 * Actions:
 *     selectPaper:     When a paper is selected for reading
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import {Optional} from 'src/common/util/types';
import {RootState} from '../../app/store';
import {getActivePaper, RelatedResourceKind, RelatedResourceRef} from '../paperPicker/paperPickerSlice';

///////////////////
//     STATE     //
///////////////////

export interface ReaderState {
	hoverResource?: RelatedResourceRef
	pinnedResources: {
		[s in RelatedResourceKind]: {
			[s: string]: boolean
		}
	}
	visibleResources: {
		[s in RelatedResourceKind]: {
			[s: string]: boolean
		}
	}
}

const initialState: ReaderState = {
	hoverResource: undefined,
	pinnedResources: {
		citation: {},
		figure: {}
	},
	visibleResources: {
		citation: {},
		figure: {}
	}
}

/////////////////////////////
//     ACTION PAYLOADS     //
/////////////////////////////

export type SetVisiblePayload = RelatedResourceRef & { isVisible: boolean }
export type SetHoverResourcePayload = Optional<RelatedResourceRef>
export type SetPinnedPayload = RelatedResourceRef & { isPinned: boolean }


///////////////////
//     SLICE     //
///////////////////

export const readerSlice = createSlice({
    name: 'reader',
    initialState,
    reducers: {
      setIsVisible: (state, action: PayloadAction<SetVisiblePayload>) => {
				const { kind, id, isVisible } = action.payload
        state.visibleResources[kind][id] = isVisible
      },
			setHoverResource: (state, action: PayloadAction<SetHoverResourcePayload>) => {
				state.hoverResource = action.payload
			},
			pinResource: (state, action: PayloadAction<SetPinnedPayload>) => {
				const { kind, id, isPinned } = action.payload
				state.pinnedResources[kind][id] = isPinned
			}
    }
})

/////////////////////
//     ACTIONS     //
/////////////////////

export const { pinResource, setHoverResource, setIsVisible: setIsVisible } = readerSlice.actions;

///////////////////////
//     SELECTORS     //
///////////////////////

/**
 * Select the resources which are currently visible in the MainPanel
 *
 * @param state 		The RootState object
 *
 * @returns 				An array of RelatedResourceRefs
 */
export const selectVisibleResources = (state: RootState): Array<RelatedResourceRef> => {
	const activePaper = getActivePaper(state)
	if (!activePaper) {
		return []
	}

	const visibleResources = state.reader.visibleResources
	
	return (Object.keys(visibleResources) as Array<keyof typeof visibleResources>)
		.flatMap(kind => (
			Object.entries(visibleResources[kind])
				.filter(([_, isVisible]) => !!isVisible)
				.flatMap(([id, _]) => ({kind, id}))
		))
}

/**
 * Select the resources which are currently pinned by the user
 *
 * @param state 		The RootState object
 *
 * @returns 				An array of RelatedResourceRefs
 */
export const selectPinnedResources = (state: RootState): Array<RelatedResourceRef> => {
	const activePaper = getActivePaper(state)
	if (!activePaper) {
		return []
	}
	const resourcesPinned = state.reader.pinnedResources
	
	return (Object.keys(resourcesPinned) as Array<keyof typeof resourcesPinned>)
		.flatMap(kind => (
			Object.entries(resourcesPinned[kind])
				.filter(([_, isPinned]) => !!isPinned)
				.flatMap(([id, _]) => ({ kind, id }))
		))
}

/**
 * Select the resources which should be rendered in the Related Panel
 * Chooses resources which are visible or pinned, or both
 *
 * @param state 			The RootState
 *
 * @returns 					An Array of RelatedResourceRefs
 */
export const selectRelatedResources = (state: RootState): Array<RelatedResourceRef> => {
	const pinnedResources = selectPinnedResources(state)
	const visibleResources = selectVisibleResources(state)

	const combined = _.union(pinnedResources, visibleResources)
	return _.uniqWith(combined, (first, second) => (
		first.id == second.id && first.kind == second.kind
	))
}

/**
 * Returns a selector function, which determines if the given resource is hovered
 *
 * @param id 			The ID of the resource
 * @param kind 		The kind of the resource
 *
 * @returns 			A selector function, which takes RootState and returns whether the resource is hovered
 */
export const resourceHasHover = (id: string, kind: RelatedResourceKind) => (state: RootState) => (
	state.reader.hoverResource?.id == id && state.reader.hoverResource.kind == kind
)

/**
 * Returns a selector function, which determines if the given resource is pinned
 *
 * @param id 			The ID of the resource
 * @param kind 		The kind of the resource
 *
 * @returns 			A selector function, which takes RootState and returns whether the resource is pinned
 */
export const resourceIsPinned = (id: string, kind: RelatedResourceKind) => (state: RootState) => (
	state.reader.pinnedResources[kind][id] == true  // TODO is this safe from null/undefined values?
)

export default readerSlice.reducer
