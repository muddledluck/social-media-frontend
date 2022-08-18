import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateInterface {
  isOpenSidebar: boolean;
}

const initialState: InitialStateInterface = {
  isOpenSidebar: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    updateIsOpenSidebar: (
      state: Draft<InitialStateInterface>,
      action: PayloadAction<boolean>
    ) => {
        state.isOpenSidebar = action.payload;
    },
  },
});


export const { updateIsOpenSidebar } = generalSlice.actions;
export default generalSlice.reducer;