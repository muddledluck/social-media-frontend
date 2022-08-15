import { createPost, getFeedPost, toggleLikePost } from "@/api/post";
import {
  CreatePostRequestData,
  PostInterface,
  ToggleVoteInterface,
} from "@/api/transform/post";
import { ServerError } from "@/types/types";
import {
  createAsyncThunk,
  createSlice,
  Draft,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "store/store";

interface InitialStateInterface {
  feed: PostInterface[];
  timeline: PostInterface[];
  creatingPost: boolean;
  errorCreatingPost: any;
  fetchingData: boolean;
  toggleLikeLoading: boolean;
}

/**
 * Default state object with initial values
 */
const initialState: InitialStateInterface = {
  feed: [],
  timeline: [],
  creatingPost: false,
  errorCreatingPost: null,
  fetchingData: false,
  toggleLikeLoading: false,
};

export const createPostThunk = createAsyncThunk<
  PostInterface,
  CreatePostRequestData,
  {
    state: RootState;
    rejectValue: ServerError;
  }
>("create/post", async (request, { rejectWithValue }) => {
  const response = await createPost(request);
  if (response.remote === "success") {
    const { data } = response;
    return data;
  } else {
    return rejectWithValue(response.error);
  }
});

export const getFeedPostThunk = createAsyncThunk<
  PostInterface[],
  void,
  { state: RootState; rejectValue: ServerError }
>("getFeed/post", async (_, { rejectWithValue }) => {
  const response = await getFeedPost();
  if (response.remote === "success") {
    return response.data;
  } else {
    return rejectWithValue(response.error);
  }
});

export const toggleLikePostThunk = createAsyncThunk<
  ToggleVoteInterface,
  string,
  { state: RootState; rejectValue: ServerError }
>("toggleLike/post", async (postId, { rejectWithValue }) => {
  const response = await toggleLikePost(postId);
  if (response.remote === "success") {
    return response.data;
  } else {
    return rejectWithValue(response.error);
  }
});

/**
 * Create a slice as a reducer containing actions.
 */

export const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(createPostThunk.pending), (state, action) => {
      state.creatingPost = true;
      state.errorCreatingPost = null;
    });
    builder.addMatcher(isAnyOf(createPostThunk.rejected), (state, action) => {
      state.creatingPost = false;
      state.errorCreatingPost = action.payload?.errors;
    });
    builder.addMatcher(isAnyOf(createPostThunk.fulfilled), (state, action) => {
      state.creatingPost = false;
      state.timeline = [action.payload, ...state.timeline];
      state.feed = [action.payload, ...state.feed];
    });
    builder.addMatcher(isAnyOf(getFeedPostThunk.pending), (state, action) => {
      state.fetchingData = true;
      state.errorCreatingPost = null;
    });
    builder.addMatcher(isAnyOf(getFeedPostThunk.rejected), (state, action) => {
      state.fetchingData = false;
      state.errorCreatingPost = action.payload?.errors;
    });
    builder.addMatcher(isAnyOf(getFeedPostThunk.fulfilled), (state, action) => {
      state.fetchingData = false;
      state.feed = action.payload;
    });
    builder.addMatcher(
      isAnyOf(toggleLikePostThunk.fulfilled),
      (state, action) => {
        let newPost: PostInterface[] = [];
        if (action.payload.action === "delete") {
          newPost = state.feed.map((post) => {
            if (post.id === action.meta.arg) {
              post.isLiked = false;
              post.totalLikes -= 1;
              post.likedUsers = post.likedUsers.filter(
                (like) => like.id !== action.payload.data.id
              );
            }
            return post;
          });
        } else if (action.payload.action === "create") {
          newPost = state.feed.map((post) => {
            if (post.id === action.meta.arg) {
              post.isLiked = true;
              post.totalLikes += 1;
              post.likedUsers = [action.payload.data, ...post.likedUsers];
            }
            return post;
          });
        }
        state.feed = newPost;
        state.toggleLikeLoading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(toggleLikePostThunk.pending),
      (state, action) => {
        state.toggleLikeLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(toggleLikePostThunk.rejected),
      (state, action) => {
        state.toggleLikeLoading = false;
      }
    );
  },
  reducers: {},
});

export default postSlice.reducer;
