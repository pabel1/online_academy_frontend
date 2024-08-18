import { createSlice } from "@reduxjs/toolkit";

const videoPlayerSlice = createSlice({
  name: "videoPlayerSlice",
  initialState: {
    activeAccordionId: 0,
    activeVideoUrls: {},
  },
  reducers: {
    setActiveAccordionId: (state, action) => {
      state.activeAccordionId = action.payload;
    },
    setAccordionVideoUrl: (state, action) => {
      const { accordionId, videoUrl } = action.payload;
      state.activeVideoUrls[accordionId] = videoUrl;
    },
    // resetVideoUrl: (state, action) => {
    //   state.activeVideoUrl = null;
    // },
  },
});

export const { setAccordionVideoUrl, resetVideoUrl, setActiveAccordionId } =
  videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;
