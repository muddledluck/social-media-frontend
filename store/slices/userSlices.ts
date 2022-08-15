import { getSessionDetails, signIn, signUp } from "@/api/user";
import { AccessToken, RefreshToken } from "@/helpers/persistStorageHelper";
import { ErrorResult, ServerError, SuccessResult } from "@/types/types";
import {
  createAsyncThunk,
  createSlice,
  Draft,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  SignInRequestData,
  SignUpRequestData,
  User,
  UserSessionResponse,
} from "api/transform/user";
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
  isLoggedIn: boolean;
  sessionId: string;
}

const initialState: UserStateInterface = {
  suggestedUser: [],
  currentUser: {
    email: "",
    id: "",
    name: "",
    profileImage: "",
  },
  sessionId: "",
  alertMessage: "",
  isLoggedIn: false,
};

export const signUpThunk = createAsyncThunk<
  string,
  SignUpRequestData,
  { state: RootState; rejectValue: ServerError }
>("user/signUp", async (request, { rejectWithValue, dispatch }) => {
  const response = await signUp(request);
  if (response.remote === "success") {
    const { data } = response;
    return data;
  } else {
    return rejectWithValue(response.error);
  }
});
export const signInThunk = createAsyncThunk<
  string,
  SignInRequestData,
  { state: RootState; rejectValue: ServerError }
>("user/signIn", async (request, { rejectWithValue, dispatch }) => {
  const response: SuccessResult<string> | ErrorResult = await signIn(request);
  console.log({ response });
  if (response.remote === "success") {
    const { data } = response;
    return data;
  } else {
    return rejectWithValue(response.error);
  }
});
export const getUserDetailsThunk = createAsyncThunk<
  UserSessionResponse,
  void,
  { state: RootState; rejectValue: ServerError }
>("user/signIn", async (_, { rejectWithValue, dispatch }) => {
  const response = await getSessionDetails();
  if (response.remote === "success") {
    return response.data;
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
    },
    updateIsLoggedInStatus: (
      state: Draft<typeof initialState>,
      action: PayloadAction<boolean>
    ) => {
      state = { ...state, isLoggedIn: action.payload };
      if (!action.payload) {
        AccessToken.remove();
        RefreshToken.remove();
        state = { ...initialState };
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(signUpThunk.fulfilled), (state, action) => {
      state.alertMessage = action.payload;
    });
    builder.addMatcher(isAnyOf(signInThunk.fulfilled), (state, action) => {
      state.isLoggedIn = true;
    });
    builder.addMatcher(
      isAnyOf(getUserDetailsThunk.fulfilled),
      (state, action) => {
        state.currentUser = action.payload.user;
        state.sessionId = action.payload.id;
      }
    );
  },
});

export const getUserState = (state: { user: UserStateInterface }) => state.user;

export const { setSuggestedUser, updateIsLoggedInStatus } = userSlice.actions;
export default userSlice.reducer;
