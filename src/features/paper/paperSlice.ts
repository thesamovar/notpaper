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
import {RootState} from '../../app/store';

export interface PaperState {
    activePaperId?: number
}

const initialState: PaperState = {
    activePaperId: undefined
}

export const paperSlice = createSlice({
    name: 'paper',
    initialState,
    reducers: {
        // The user opens a paper for reading
        selectPaper: (state, action: PayloadAction<number>) => {
            state.activePaperId = action.payload
        },
    }
})

export const { selectPaper } = paperSlice.actions;

export const selectActivePaperId = (state: RootState) => state.paper.activePaperId

export default paperSlice.reducer
