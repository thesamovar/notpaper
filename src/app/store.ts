/**
 * Redux Store
 *
 * The store controls the state of the app (e.g. which resources the user has pinned).
 *
 * The state is a Javascript object, split into distinct "slices". Each slice is handled by a reducer. 
 * When an action is dispatched to the store, it is passed to the corresponding reducer. The reducer then
 * updates the state based on the contents of the action.
 *
 * The flow of data when a component updates the state:
 * Component -> Action -> Store -> Reducer -> State
 *
 * The flow of data when a component receives state:
 * Component <- Selector <- State
 */
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import paperReducer from 'src/features/paperPicker/paperPickerSlice'
import readerReducer from 'src/features/reader/readerSlice'

// The store is what controls the state of the app
export const store = configureStore({
  reducer: {
		paper: paperReducer,
		reader: readerReducer
  },
})

// Some useful Typescript types
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

(window as any).getState = store.getState
