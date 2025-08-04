
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { fetchFavorites } from '../../store/slices/get/allFavoritesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Alert, AlertTitle, Button, DialogActions, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Snackbar, TextField } from '@mui/material';
import type { FavoritesTypes } from '../../types/Favorites.types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

type EntryFormProps = {
    closeDialog: () => void;
    submitBtn: string;
    defaultValues: FavoritesTypes;
    isEdit?: boolean;
    id?: string
};

export const EntryForm = ({ closeDialog, submitBtn, defaultValues, isEdit = false, id }: EntryFormProps) => {
    const closeModel = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    // const { token, logout } = useAuth();
    const dispatch = useAppDispatch();
    const { data: favorites } = useAppSelector((state) => state.favorites);
    const lastId = Math.max(...favorites.map(fav => Number(fav.id ?? 0)));

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    const form = useForm<FavoritesTypes>({ mode: "onTouched", defaultValues });
    const { register, handleSubmit, formState, reset, control } = form;
    const { errors, isSubmitting, isSubmitSuccessful } = formState;

    const handleAlert = (data: FavoritesTypes) => {
        const msg = isEdit
            ? `Favorite ${data.type === "movie" ? "Movie" : "TV Show"} updated successfully!`
            : `Favorite ${data.type === "movie" ? "Movie" : "TV Show"} added successfully!`;
        setMessage(msg);
        setOpen(true);
    };

    const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const onSubmitForm = async (data: FavoritesTypes) => {
        try {
            if (isEdit) {
                await axios.put(`http://localhost:3001/favorites/${id}`, data); // 👈 تعديل
            } else {
                const newFavorite = {
                    id: `${lastId + 1}`,
                    ...data
                };
                await axios.post('http://localhost:3001/favorites', newFavorite);
            }

            handleAlert(data);
            setTimeout(() => closeModel.current?.click(), 2000);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            setTimeout(() => dispatch(fetchFavorites()), 2000);
        }
    }, [dispatch, isSubmitSuccessful]);

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    <AlertTitle>Successful</AlertTitle>
                    {message}
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit(onSubmitForm)} noValidate>
                <div className="grid grid-cols-12 gap-4 p-3">
                    <TextField
                        required
                        margin="none"
                        id="title_input"
                        label="Title"
                        type="text"
                        variant="outlined"
                        className="col-span-12"
                        {...register("title", { required: "Field is required" })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <Controller
                        name="type"
                        control={control}
                        rules={{ required: "Field is required" }}
                        render={({ field }) => (
                            <FormControl
                                required
                                className="col-span-12 sm:col-span-6"
                                error={!!errors.type}
                            >
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    labelId="type-label"
                                    id="demo-simple-select"
                                    label="Type *"
                                    {...field}
                                >
                                    <MenuItem value="" className="!hidden"></MenuItem>
                                    <MenuItem value="movie">Movie</MenuItem>
                                    <MenuItem value="show">TV Show</MenuItem>
                                </Select>
                                <FormHelperText>{errors.type?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                    <TextField
                        required
                        margin="none"
                        id="director_input"
                        label="Director"
                        type="text"
                        variant="outlined"
                        className="col-span-12 sm:col-span-6"
                        {...register("director", { required: "Field is required" })}
                        error={!!errors.director}
                        helperText={errors.director?.message}
                    />
                    <Controller
                        name="budget"
                        control={control}
                        rules={{
                            required: "Field is required",
                            validate: (value) =>
                                parseFloat(value) >= 0 || "Budget must be 0 or more",
                        }}
                        render={({ field }) => (
                            <FormControl
                                required
                                className="col-span-12 sm:col-span-6"
                                error={!!errors.budget}
                            >
                                <InputLabel htmlFor="budget_input">Budget</InputLabel>
                                <OutlinedInput
                                    {...field}
                                    id="budget_input"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Budget"
                                    type="number"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === "") {
                                            field.onChange("");
                                            return;
                                        }
                                        let parsed = parseFloat(value);
                                        if (isNaN(parsed) || parsed < 0) {
                                            parsed = 0;
                                        }

                                        field.onChange(parsed.toString());
                                    }}
                                    value={field.value ?? ""}
                                    inputProps={{
                                        min: 0,
                                        inputMode: "numeric",
                                        style: {
                                            MozAppearance: "textfield",
                                        },
                                    }}
                                    sx={{
                                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                            WebkitAppearance: "none",
                                            margin: 0,
                                        },
                                    }}
                                />
                                <FormHelperText>{errors.budget?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                    <TextField
                        required
                        margin="none"
                        id="location_input"
                        label="Location"
                        type="text"
                        variant="outlined"
                        className="col-span-12 sm:col-span-6"
                        {...register("location", { required: "Field is required" })}
                        error={!!errors.location}
                        helperText={errors.location?.message}
                    />
                    <Controller
                        name="duration"
                        control={control}
                        rules={{
                            required: "Field is required",
                            validate: (value) =>
                                parseFloat(value) >= 0 || "Duration must be 0 or more",
                        }}
                        render={({ field }) => (
                            <FormControl
                                required
                                className="col-span-12 sm:col-span-6"
                                error={!!errors.duration}
                            >
                                <InputLabel htmlFor="duration_input">Duration</InputLabel>
                                <OutlinedInput
                                    {...field}
                                    id="duration_input"
                                    endAdornment={<InputAdornment position="end">min</InputAdornment>}
                                    label="Duration"
                                    type="number"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === "") {
                                            field.onChange("");
                                            return;
                                        }
                                        let parsed = parseFloat(value);
                                        if (isNaN(parsed) || parsed < 0) {
                                            parsed = 0;
                                        }

                                        field.onChange(parsed.toString());
                                    }}
                                    value={field.value ?? ""}
                                    inputProps={{
                                        min: 0,
                                        inputMode: "numeric",
                                        style: {
                                            MozAppearance: "textfield",
                                        },
                                    }}
                                    sx={{
                                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                            WebkitAppearance: "none",
                                            margin: 0,
                                        },
                                    }}
                                />
                                <FormHelperText>{errors.duration?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Controller
                            name="year"
                            control={control}
                            rules={{ required: "Year is required" }}
                            render={({ field }) => (
                                <DatePicker
                                    views={['year']}
                                    label="Year"
                                    className="col-span-12 sm:col-span-6"
                                    value={field.value ? new Date(field.value) : null}
                                    onChange={(date) => field.onChange(date)}
                                    slotProps={{
                                        textField: {
                                            helperText: errors.year?.message,
                                            error: !!errors.year,
                                            required: true,
                                            fullWidth: true
                                        }
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </div>
                <DialogActions className='my-5'>
                    <Button
                        ref={closeModel}
                        onClick={() => { reset(); closeDialog(); }}
                        disabled={isSubmitting}
                        className='btn !text-primary !text-[16px]'
                        variant='text'
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className='btn btn-primary !text-[16px]'
                        variant='contained'
                        disabled={isSubmitting}
                    >
                        {submitBtn}
                    </Button>
                </DialogActions>
            </form>
        </>
    );
};
