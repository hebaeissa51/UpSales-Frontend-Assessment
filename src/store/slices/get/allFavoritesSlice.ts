import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { FavoritesTypes } from '../../../types/Favorites.types';

type FavoritesState = {
    data: FavoritesTypes[];
    loading: boolean;
    error: string | null;
};

type Params = {
    type?: string;
    year?: Date | string;
}

const initialState: FavoritesState = {
    data: [],
    loading: false,
    error: null
};

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async (params?: Params) => {
    const response = await axios.get('http://localhost:3001/favorites', {
        params,
    });
    return response.data;
});

const allFavoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Something went wrong';
            });
    }
});

export default allFavoritesSlice.reducer;
