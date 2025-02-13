import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ImageState {
  imgs: string[];
}

const initialState: ImageState = {
  imgs: [],
};

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImageToGallery: (state, action: PayloadAction<string>) => {
      state.imgs.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addImageToGallery } = imageSlice.actions;

export default imageSlice.reducer;
