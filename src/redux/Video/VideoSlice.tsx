import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVideo = createAsyncThunk(
  "videoCard/fetchVideo",
  async (SearchParams: string) => {
    let api: string = import.meta.env.VITE_API;
    const http: string = "https://www.googleapis.com/youtube/v3/videos?";

    const response = await fetch(
      http +
        new URLSearchParams({
          key: api,
          part: "snippet,statistics",
          id: SearchParams,
        })
    );
    return response.json();
  }
);

export const fetchVideoChannelData = createAsyncThunk(
  "videoCard/fetchVideoChannelData",
  async (channelId: string) => {
    let api: string = import.meta.env.VITE_API;
    const http: string = "https://www.googleapis.com/youtube/v3/channels?";

    const response = await fetch(
      http +
        new URLSearchParams({
          key: api,
          part: "snippet",
          id: channelId,
        })
    );

    const data = await response.json();
    return data.items[0];
  }
);

interface VideoSlice {
  videoData: any[];
  channelData: any[];
  isLoading: boolean;
}

const initialState: VideoSlice = {
  videoData: [],
  channelData: [],
  isLoading: true,
};

export const VideoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideo.fulfilled, (state, action) => {
      state.videoData = action.payload.items;
      state.isLoading = false;
    });
    builder.addCase(fetchVideoChannelData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideoChannelData.fulfilled, (state, action) => {
      state.channelData = action.payload;
      state.isLoading = false;
    });
  },
});

export const selectVideoIsLoading = (state: { video: VideoSlice }) =>
  state.video.isLoading;
export const selectVideoData = (state: { video: VideoSlice }) =>
  state.video.videoData;
export const selectChannelData = (state: { video: VideoSlice }) =>
  state.video.channelData;
export default VideoSlice.reducer;
