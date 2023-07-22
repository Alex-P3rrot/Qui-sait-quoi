import {NavigationState} from "./types/NavigationState";
import {createSlice, Slice} from "@reduxjs/toolkit";

const initialState: NavigationState = {
    isMenuLeftToggled: false,
    isMenuRightToggled: false
}

export const navigationSlice: Slice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setIsMenuLeftToggled: (state: NavigationState, action) => {
            state.isMenuLeftToggled = action.payload
        },
        setIsMenuRightToggled: (state: NavigationState, action) => {
            state.isMenuRightToggled = action.payload
        },
    }
})

export const {
    setIsMenuLeftToggled,
    setIsMenuRightToggled
} = navigationSlice.actions;

export default navigationSlice.reducer;