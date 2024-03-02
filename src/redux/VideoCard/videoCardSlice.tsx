import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVideoCardData = createAsyncThunk(
  "videoCard/fetchVideoCardData",
  async () => {
    let api: string = import.meta.env.VITE_API;
    const http: string = "https://www.googleapis.com/youtube/v3/videos?";

    const response = await fetch(
      http +
        new URLSearchParams({
          key: api,
          part: "snippet,statistics",
          chart: "mostPopular",
          type: "video",
          maxResults: "5",
          regionCode: "TR",
          videoDuration: "long",
        })
    );
    return response.json();
  }
);

export const fetchChannelCardData = createAsyncThunk(
  "videoCard/fetchChannelCardData",
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

interface VideoCardSlice {
  videoData: any[];
  channelData: any[];
  isLoading: boolean;
}

const initialState: VideoCardSlice = {
  videoData: [],
  channelData: [],
  isLoading: true,
};

export const videoCardSlice = createSlice({
  name: "videoCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideoCardData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideoCardData.fulfilled, (state, action) => {
      state.videoData = action.payload.items;
      state.isLoading = false;
    });
    builder.addCase(fetchChannelCardData.pending, (state) => {
      state.isLoading = true;
      state.channelData = [];
    });
    builder.addCase(fetchChannelCardData.fulfilled, (state, action) => {
      state.channelData = [...state.channelData, action.payload];
      state.isLoading = false;
    });
  },
});

export const selectVideoIsLoading = (state: { videoCard: VideoCardSlice }) =>
  state.videoCard.isLoading;
export const selectVideoCardData = (state: { videoCard: VideoCardSlice }) =>
  state.videoCard.videoData;
export const selectChannelCardData = (state: { videoCard: VideoCardSlice }) =>
  state.videoCard.channelData;
export default videoCardSlice.reducer;
