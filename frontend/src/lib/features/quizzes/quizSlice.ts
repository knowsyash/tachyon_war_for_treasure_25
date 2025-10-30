import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Question {
    id: number;
    questionText: string;
    options: string[];
    correctAnswer: string;
}

export interface QuizState {
    questions: Question[];
    currentQuizId: number;
}

const initialState: QuizState = {
    questions: [],
    currentQuizId: 0,
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
        },
        setCurrentQuizId: (state, action: PayloadAction<number>) => {
            state.currentQuizId = action.payload;
        },
    },
});

export const { setQuestions, setCurrentQuizId } = quizSlice.actions;

export default quizSlice.reducer;