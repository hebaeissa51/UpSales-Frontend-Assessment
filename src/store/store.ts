import { configureStore } from '@reduxjs/toolkit'
import allFavoritesReducer from './slices/get/allFavoritesSlice'
import favoriteByIdReducer from './slices/get/favoriteByIdSlice'

export const store = configureStore({
    reducer: {
        favorites: allFavoritesReducer,
        favorite: favoriteByIdReducer,
    },
})