export type FavoritesTypes = {
    id?: string;
    title: string;
    type: "movie" | "show" | "";
    director: string;
    budget: string;
    location: string;
    duration: string;
    year: Date | string;
}