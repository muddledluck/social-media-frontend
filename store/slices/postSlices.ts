import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export interface PostStateInterface {
  name: string;
  date: string;
  post: postType;
  likedUsers: likeType[];
  totalShare: number;
  totalComments: number;
}

/**
 * Default state object with initial values
 */
const initialState: PostStateInterface[] = [];

/**
 * Create a slice as a reducer containing actions.
 */

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (
      state: Draft<typeof initialState>,
      action: PayloadAction<PostStateInterface[]>
    ) => {
      state = action.payload;
      return state;
    },
  },
});

// A small helper of post state for `useSelector` function
export const getPostState = (state: { post: PostStateInterface }) => state.post;

// Exports all actions
export const { setPost } = postSlice.actions;
export default postSlice.reducer;
