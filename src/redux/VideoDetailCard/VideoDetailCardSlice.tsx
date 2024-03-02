import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVideoDetailData = createAsyncThunk(
  "videoDetailCard/fetchVideoDetailData",
  async (videoTitle: string) => {
    let api: string = import.meta.env.VITE_API;
    const http: string = "https://www.googleapis.com/youtube/v3/search?";

    const response = await fetch(
      http +
        new URLSearchParams({
          key: api,
          q: videoTitle.replace(/[^\w\s.ğüşıöçĞÜŞİÖÇ]/g, ""),
          part: "snippet",
          type: "video",
          maxResults: "5",
          regionCode: "TR",
          videoDuration: "long",
        })
    );
    return response.json();
  }
);

interface VideoDetailCardSlice {
  videoData: any[];
  isLoading: boolean;
}

const initialState: VideoDetailCardSlice = {
  videoData: [],
  isLoading: true,
};
export const VideoDetailCardSlice = createSlice({
  name: "videoDetailCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideoDetailData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideoDetailData.fulfilled, (state, action) => {
      state.videoData = action.payload.items;
      state.isLoading = false;
    });
  },
});

export const selectVideoDetailCardIsLoading = (state: {
  videoDetailCard: VideoDetailCardSlice;
}) => state.videoDetailCard.isLoading;
export const selectVideoDetailCardData = (state: {
  videoDetailCard: VideoDetailCardSlice;
}) => state.videoDetailCard.videoData;
export default VideoDetailCardSlice.reducer;
