import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { Status as StatusApi } from "server-types";

type Status = "idle" | "loading" | "succeeded" | "failed";
type Error = string | null | undefined;

interface InitialState {
  sections: {
    data: StatusApi;
    status: Status;
    error: Error;
  };
}

const initialState: InitialState = {
  sections: {
    data: {
      untracked: [],
      unstaged: [],
      staged: [],
      unmodified: [],
    },
    status: "idle",
    error: null,
  },
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.sections.status = "loading";
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.sections.status = "succeeded";
        // replace section with fetched sections
        state.sections.data = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.sections.status = "failed";
        state.sections.error = action.error.message;
      });
  },
});

// TODO proper error handling
export const fetchSections = createAsyncThunk(
  "status/fetchSections",
  async () => {
    const response = await axios.get<InitialState["sections"]["data"]>(
      "/status"
    );
    return response.data;
  }
);

export const selectSections = (state: RootState) => state.status.sections;

export default statusSlice.reducer;
