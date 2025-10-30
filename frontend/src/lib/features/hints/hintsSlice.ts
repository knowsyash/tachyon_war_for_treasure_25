import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Hint {
    id: number;
    quizId: number;
    hintText: string;
}

export interface HintsState {
    hints: Hint[];
    currentQuizId: number;
}

const initialState: HintsState = {
    hints: [],
    currentQuizId: 0,
};

const hintsSlice = createSlice({
    name: "hints",
    initialState,
    reducers: {
        setHints: (state, action: PayloadAction<Hint[]>) => {
            state.hints = action.payload;
        },
        setCurrentQuizId: (state, action: PayloadAction<number>) => {
            state.currentQuizId = action.payload;
        },
    },
});

export const { setHints, setCurrentQuizId } = hintsSlice.actions;

export default hintsSlice.reducer;