/*
 * Redux Slice for the Paper component
 *
 * State:
 *     hoveredResources:   A list of resources that are being hovered over
 *     pinnedResources:    An object of resources which are currently pinned
 *     visibleResources:   An object of resources which are currently visible
 *
 * Actions:
 *     selectPaper:     When a paper is selected for reading
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import { isRefChain } from 'src/common/util/guards'
import { RootState } from '../../app/store'
import {
  CanHover,
  CanPin,
  CitationRef,
  RefChain,
  RelatedResourceKind,
  RelatedResourceRef,
} from 'src/common/types'
import { getActivePaper } from 'src/features/paper/paperSlice'

///////////////////
//     STATE     //
///////////////////

export interface ReaderState {
  hoveredResources: CanHover[]
  pinnedResources: {
    [s in RelatedResourceKind]: {
      [s: string]: boolean
    }
  }
  visibleResources: {
    [s in RelatedResourceKind]: {
      [s: string]: string[]
    }
  }
}

const initialState: ReaderState = {
  hoveredResources: [],
  pinnedResources: {
    citation: {},
    figure: {},
  },
  visibleResources: {
    citation: {},
    figure: {},
  },
}

/////////////////////////////
//     ACTION PAYLOADS     //
/////////////////////////////

export type SetVisiblePayload = RelatedResourceRef & { componentId: string }
export type ToggleHoveredResourcePayload = CanHover
export type SetPinnedPayload = RelatedResourceRef & { isPinned: boolean }

///////////////////
//     SLICE     //
///////////////////

export const readerSlice = createSlice({
  name: 'reader',
  initialState,
  reducers: {
    setIsVisible: (state, action: PayloadAction<SetVisiblePayload>) => {
      const { kind, id, componentId } = action.payload
      const visibleResources = state.visibleResources[kind]
      const visibleComponents = visibleResources[id] // Resources may appear multiple times in separate components
      if (Array.isArray(visibleComponents)) {
        visibleComponents.push(componentId)
      } else {
        state.visibleResources[kind][id] = [componentId]
      }
    },
    setNotVisible: (state, action: PayloadAction<SetVisiblePayload>) => {
      const { kind, id, componentId } = action.payload
      const visibleResources = state.visibleResources[kind]
      const visibleComponents = visibleResources[id] // Resources may appear multiple times in separate components
      if (Array.isArray(visibleComponents)) {
        if (visibleComponents.length === 0) {
          // No components, so do nothing
          return
        } else {
          state.visibleResources[kind][id] = visibleComponents.filter(
            (id) => id !== componentId,
          )
        }
      }
    },
    toggleHoveredResource: (
      state,
      action: PayloadAction<ToggleHoveredResourcePayload>,
    ) => {
      const isHovered = state.hoveredResources.some((ref) =>
        _.isEqual(ref, action.payload),
      )
      if (isHovered) {
        state.hoveredResources = state.hoveredResources.filter(
          (ref) => !_.isEqual(ref, action.payload),
        )
      } else {
        state.hoveredResources.push(action.payload)
      }
    },
    pinResource: (state, action: PayloadAction<SetPinnedPayload>) => {
      const { kind, id, isPinned } = action.payload
      state.pinnedResources[kind][id] = isPinned
    },
  },
})

/////////////////////
//     ACTIONS     //
/////////////////////

export const {
  pinResource,
  toggleHoveredResource,
  setIsVisible,
  setNotVisible,
} = readerSlice.actions

///////////////////////
//     SELECTORS     //
///////////////////////

/**
 * Select the resources which are currently visible in the MainPanel
 *
 * @param state 		The RootState object
 * @returns 				An array of RelatedResourceRefs
 */
export const selectVisibleResources = (
  state: RootState,
): Array<RelatedResourceRef> => {
  const activePaper = getActivePaper(state)
  if (!activePaper) {
    return []
  }

  const visibleResources = state.reader.visibleResources

  return (Object.keys(visibleResources) as Array<
    keyof typeof visibleResources
  >).flatMap((kind) =>
    Object.entries(visibleResources[kind])
      .filter(
        ([_, componentIds]) =>
          Array.isArray(componentIds) && componentIds.length > 0,
      )
      .flatMap(([id, _]) => ({ kind, id })),
  )
}

/**
 * Select the resources which are currently pinned by the user
 *
 * @param state 		The RootState object
 * @returns 				An array of RelatedResourceRefs
 */
export const selectPinnedResources = (
  state: RootState,
): Array<RelatedResourceRef> => {
  const activePaper = getActivePaper(state)
  if (!activePaper) {
    return []
  }
  const resourcesPinned = state.reader.pinnedResources

  // Object.keys() return value is un-typed, so we assign the correct type
  type ResourcesPinnedKeys = Array<keyof typeof resourcesPinned>
  return (Object.keys(resourcesPinned) as ResourcesPinnedKeys).flatMap((kind) =>
    Object.entries(resourcesPinned[kind])
      .filter(([_, isPinned]) => !!isPinned)
      .flatMap(([id, _]) => ({ kind, id })),
  )
}

/**
 * Select the resources which should be rendered in the Related Panel
 * Chooses resources which are visible or pinned, or both
 *
 * @param state 			The RootState
 * @returns 					An Array of RelatedResourceRefs
 */
export const selectRelatedResources = (
  state: RootState,
): Array<RelatedResourceRef> => {
  const pinnedResources = selectPinnedResources(state)
  const visibleResources = selectVisibleResources(state)

  const combined = _.union(pinnedResources, visibleResources)
  return _.uniqWith(
    combined,
    (first, second) => first.id === second.id && first.kind === second.kind,
  )
}

/**
 * Returns a selector function, which determines if the given resource is hovered
 *
 * @param ref 		The resource which may or may not be hovered
 * @returns 			A selector function, which takes RootState and returns whether the resource is hovered
 */
export const resourceHasHover = (ref: CanHover) => (state: RootState) => {
  const hoveredResources = state.reader.hoveredResources
  return !!_.find(hoveredResources, ref)
}

/**
 * Returns a selector function, which determines if the given resource is hovered
 *
 * @param chain 		The ChainRef that may or may not be hovered
 * @returns 			A selector function, which takes RootState and returns whether the resource is hovered
 */
export const citationChainHasHover = (chain: RefChain<CitationRef>) => (
  state: RootState,
) => {
  if (isRefChain<CitationRef>(state.reader.hoveredResources)) {
    return chain.some((ref) => _.find(state.reader.hoveredResources, ref))
  } else {
    return false
  }
}

/**
 * Returns a selector function, which determines if the given resource is pinned
 *
 * @param ref 			The ResourceRef which may or may not be pinned
 * @returns 			A selector function, which takes RootState and returns whether the resource is pinned
 */
export const resourceIsPinned = (ref: CanPin) => (state: RootState) =>
  state.reader.pinnedResources[ref.kind][ref.id] === true // TODO is this safe from null/undefined values?

/////////////////////
//     REDUCER     //
/////////////////////

export default readerSlice.reducer
