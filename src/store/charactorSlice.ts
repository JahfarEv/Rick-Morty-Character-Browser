import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse, Character, Filters } from '@/lib/types';
import { fetchCharacters } from '@/lib/api';

interface CharacterState {
  data: ApiResponse | null;
  filters: Filters;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CharacterState = {
  data: null,
  filters: {
    page: 1,
    name: '',
    status: '',
    species: '',
  },
  status: 'idle',
  error: null,
};

export const fetchCharactersThunk = createAsyncThunk(
  'characters/fetchCharacters',
  async (filters: Filters, { rejectWithValue }) => {
    try {
      const response = await fetchCharacters(filters);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharactersThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCharactersThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, resetFilters } = characterSlice.actions;
export default characterSlice.reducer;