import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface GalleryState {
  images: string[];
  imageToShow: string;
}

const initialState: GalleryState = {
  images: [],
  imageToShow: "",
};

export const gallerySlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImageToGallery: (state, action: PayloadAction<string>) => {
      state.images = [...state.images, action.payload];
    },
    showImage: (state, action: PayloadAction<string>) => {
      state.imageToShow = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addImageToGallery, showImage } = gallerySlice.actions;

export default gallerySlice.reducer;
