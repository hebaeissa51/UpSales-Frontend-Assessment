
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, AlertTitle, Button, DialogActions, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { LoginTypes } from '../../types/User.types';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const LoginForm = () => {
    const [open, setOpen] = useState(false);
    const [isFormSuccess, setIsFormSuccess] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const form = useForm<LoginTypes>({ mode: "onTouched" });
    const { register, handleSubmit, formState, control } = form;
    const { errors, isSubmitting } = formState;
    const [showPassword, setShowPassword] = useState(false);

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const handleShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const handleMouseUpPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const onSubmitForm = async (data: LoginTypes) => {
        try {
            await login(data.email, data.password);
            setIsFormSuccess(true);
            handleAlert();
            setTimeout(() => navigate('/', { replace: true }), 2000);
        } catch (error) {
            setIsFormSuccess(false);
            handleAlert();
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={isFormSuccess ? "success" : "error"} sx={{ width: '100%' }}>
                    <AlertTitle>{isFormSuccess ? "Successful" : "Failed"} Successful</AlertTitle>
                    {isFormSuccess ? "You have successfully logged in!" : "Invalid credentials"}
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit(onSubmitForm)} noValidate>
                <div className="grid grid-cols-12 gap-4 p-3">
                    <TextField
                        required
                        margin="none"
                        id="email_input"
                        label="Email"
                        type="email"
                        variant="outlined"
                        className="col-span-12"
                        {...register("email", { required: "Field is required" })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <Controller
                        name="password"
                        defaultValue=""
                        control={control}
                        rules={{ required: "Field is required" }}
                        render={({ field }) => (
                            <FormControl
                                variant="outlined"
                                required
                                className="col-span-12"
                                error={!!errors.password}
                            >
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={showPassword ? 'hide the password' : 'display the password'}
                                                onClick={handleShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    className="col-span-12"
                                    {...field}
                                />
                                <FormHelperText>{errors.password?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </div>
                <DialogActions className='!justify-center my-5'>
                    <Button
                        type="submit"
                        className='btn btn-primary !text-[18px] w-[50%] h-[50px]'
                        variant='contained'
                        disabled={isSubmitting}
                    >
                        Login
                    </Button>
                </DialogActions>
            </form>
        </>
    );
};
