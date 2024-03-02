import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVideoSearchData = createAsyncThunk(
  "videoCard/fetchVideoSearchData",
  async (SearchParams: string) => {
    let api: string = import.meta.env.VITE_API;
    const http: string = "https://www.googleapis.com/youtube/v3/search?";
    const response = await fetch(
      http +
        new URLSearchParams({
          key: api,
          q: SearchParams,
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

export const fetchChannelSearchData = createAsyncThunk(
  "videoCard/fetchChannelSearchData",
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

interface VideoSearchCardSlice {
  videoData: any[];
  channelData: any[];
  isLoading: boolean;
}

const initialState: VideoSearchCardSlice = {
  videoData: [],
  channelData: [],
  isLoading: true,
};

export const VideoSearchCardSlice = createSlice({
  name: "videoSearchCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideoSearchData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideoSearchData.fulfilled, (state, action) => {
      state.videoData = action.payload.items;
      state.isLoading = false;
    });
    builder.addCase(fetchChannelSearchData.pending, (state) => {
      state.isLoading = true;
      state.channelData = [];
    });
    builder.addCase(fetchChannelSearchData.fulfilled, (state, action) => {
      state.channelData = [...state.channelData, action.payload];
      state.isLoading = false;
    });
  },
});

export const selectVideoSearchCardIsLoading = (state: {
  videoSearchCard: VideoSearchCardSlice;
}) => state.videoSearchCard.isLoading;
export const selectVideoSearchCardData = (state: {
  videoSearchCard: VideoSearchCardSlice;
}) => state.videoSearchCard.videoData;
export const selectChannelSearchCardData = (state: {
  videoSearchCard: VideoSearchCardSlice;
}) => state.videoSearchCard.channelData;
export default VideoSearchCardSlice.reducer;
