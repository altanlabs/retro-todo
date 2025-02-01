import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

interface TableState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTableData = createAsyncThunk(
  'tables/fetchTableData',
  async (tableName: string) => {
    const response = await axios.get(`/${tableName}`);
    return response.data;
  }
);

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    clearTableData: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { clearTableData } = tablesSlice.actions;
export default tablesSlice.reducer;