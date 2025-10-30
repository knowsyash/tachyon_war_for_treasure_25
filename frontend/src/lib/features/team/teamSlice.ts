import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// export interface TeamMember {
//     id: number;
//     name: string;
// }

export interface TeamState {
    teamName: string;
}

const initialState: TeamState = {
    teamName: "",
};

export const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        setTeamName: (state, action: PayloadAction<string>) => {
            state.teamName = action.payload;
        },
    },
},
);

export const { setTeamName } = teamSlice.actions;

export default teamSlice.reducer;
