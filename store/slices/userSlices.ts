import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export interface SuggestedUserInterface {
  name: string;
  profileImage: string;
  designation: string;
}
export interface UserStateInterface {
  // currentUser
  suggestedUser: SuggestedUserInterface[];
}

const initialState: UserStateInterface = {
  suggestedUser: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSuggestedUser: (
      state: Draft<typeof initialState>,
      action: PayloadAction<SuggestedUserInterface[]>
    ) => {
      state.suggestedUser = action.payload;
      return state;
    },
  },
});

export const getUserState = (state: { user: UserStateInterface }) => state.user;

export const { setSuggestedUser } = userSlice.actions;
export default userSlice.reducer;
