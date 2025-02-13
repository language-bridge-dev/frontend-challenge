import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface GalleryState {
  images: string[];
}

const initialState: GalleryState = {
  images: [],
};

export const gallerySlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImageToGallery: (state, action: PayloadAction<string>) => {
      state.images = [...state.images, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addImageToGallery } = gallerySlice.actions;

export default gallerySlice.reducer;
