import { signUp } from "@/api/user";
import { ServerError } from "@/types/types";
import {
  createAsyncThunk,
  createSlice,
  Draft,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { SignUpRequestData, User } from "api/transform/user";
import { RootState } from "store/store";

export interface SuggestedUserInterface {
  name: string;
  profileImage: string;
  designation: string;
}
export interface UserStateInterface {
  // currentUser
  suggestedUser: SuggestedUserInterface[];
  currentUser: User;
  alertMessage: string;
}

const initialState: UserStateInterface = {
  suggestedUser: [],
  currentUser: {
    email: "",
    id: "",
    name: "",
    profileImage: "",
  },
  alertMessage: "",
};

export const signUpThunk = createAsyncThunk<
  string,
  SignUpRequestData,
  { state: RootState; rejectValue: ServerError }
>("user/signUp", async (request, { rejectWithValue, dispatch }) => {
  console.log("requesting");
  const response = await signUp(request);
  console.log({ response });
  if (response.remote === "success") {
    const { data } = response;
    return data;
  } else {
    return rejectWithValue(response.error);
  }
});

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
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(signUpThunk.fulfilled), (state, action) => {
      state.alertMessage = action.payload;
    });
  },
});

export const getUserState = (state: { user: UserStateInterface }) => state.user;

export const { setSuggestedUser } = userSlice.actions;
export default userSlice.reducer;
