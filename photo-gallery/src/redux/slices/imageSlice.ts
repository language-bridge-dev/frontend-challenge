import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface GalleryState {
  images: string[];
  showImage: boolean;
  imageToShow: string;
}

const initialState: GalleryState = {
  images: [],
  showImage: false,
  imageToShow: "",
};

export const gallerySlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImageToGallery: (state, action: PayloadAction<string>) => {
      state.images = [...state.images, action.payload];
    },
    toggleShowImage: (state) => {
      state.showImage = !state.showImage;
    },
    showImage: (state, action: PayloadAction<string>) => {
      state.imageToShow = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addImageToGallery, toggleShowImage, showImage } =
  gallerySlice.actions;

export default gallerySlice.reducer;
