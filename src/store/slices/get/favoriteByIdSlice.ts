import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { FavoritesTypes } from '../../../types/Favorites.types';

type FavoriteByIdState = {
    data: FavoritesTypes | null;
    loading: boolean;
    error: string | null;
};

const initialState: FavoriteByIdState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchFavoriteById = createAsyncThunk(
    'favorite/fetchById',
    async (id: string) => {
        const response = await axios.get(`http://localhost:3001/favorites/${id}`);
        return response.data as FavoritesTypes;
    }
);

const favoriteByIdSlice = createSlice({
    name: 'favoriteById',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoriteById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavoriteById.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchFavoriteById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Something went wrong';
            });
    },
});

export default favoriteByIdSlice.reducer;
