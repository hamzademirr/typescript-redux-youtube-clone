import { createSlice } from "@reduxjs/toolkit";

interface ThemeSlice {
  theme: boolean;
}

const initialState: ThemeSlice = {
  theme: true,
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.theme = !state.theme;
    },
  },
});

export const selectTheme = (state: { theme: ThemeSlice }) => state.theme.theme;
export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
