import { createSlice } from "@reduxjs/toolkit";

interface SidebarSlice {
  show: boolean;
}

const initialState: SidebarSlice = {
  show: false,
};
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.show = !state.show;
    },
  },
});

export const selectSidebar = (state: { sidebar: SidebarSlice }) =>
  state.sidebar.show;
export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
