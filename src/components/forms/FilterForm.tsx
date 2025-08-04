
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { fetchFavorites } from '../../store/slices/get/allFavoritesSlice';
import { useAppDispatch } from '../../hooks/redux';
import { Alert, AlertTitle, Button, DialogActions, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import type { FavoritesTypes } from '../../types/Favorites.types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

export const FilterForm = () => {
    const resetBtnRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const form = useForm<FavoritesTypes>({
        mode: "onTouched",
        defaultValues: {
            type: "",
            year: ""
        }
    });
    const { handleSubmit, formState, reset, control } = form;
    const { isSubmitting } = formState;

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const onSubmitForm = async (data: FavoritesTypes) => {
        const type = data.type;
        const year = data.year;

        try {
            axios.get("http://localhost:3001/favorites", {
                params: { type, year }
            });
            setTimeout(() => dispatch(fetchFavorites({ type, year })), 1000);
            handleAlert();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleFetchingData = useCallback(() => {
        dispatch(fetchFavorites());
    }, [dispatch])

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
                    Data Filtered Successfully!
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit(onSubmitForm)} noValidate>
                <div className="grid grid-cols-12 gap-4 p-3">
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                className="col-span-12 sm:col-span-6"
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
                            </FormControl>
                        )}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Controller
                            name="year"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    views={['year']}
                                    label="Year"
                                    className="col-span-12 sm:col-span-6"
                                    value={field.value ? new Date(field.value) : null}
                                    onChange={(date) => field.onChange(date)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true
                                        }
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </div>
                <DialogActions className=' !justify-start my-5'>
                    <Button
                        type="submit"
                        className='btn btn-primary !text-[16px]'
                        variant='outlined'
                        disabled={isSubmitting}
                    >
                        <i className="fas fa-search text-[14px] mr-2"></i> Filter
                    </Button>
                    <Button
                        ref={resetBtnRef}
                        onClick={() => { reset(); handleFetchingData(); }}
                        disabled={isSubmitting}
                        className='btn !text-primary !border-primary !text-[16px]'
                        variant='outlined'
                    >
                        <i className="fas fa-trash text-[14px] mr-2"></i> Reset
                    </Button>
                    
                </DialogActions>
            </form>
        </>
    );
};
