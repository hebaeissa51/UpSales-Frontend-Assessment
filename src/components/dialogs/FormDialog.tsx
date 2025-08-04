import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { EntryForm } from '../forms/EntryForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchFavoriteById } from '../../store/slices/get/favoriteByIdSlice';
import ThreeDotsSpinner from '../spinners/ThreeDotsSpinner';
import type { FavoritesTypes } from '../../types/Favorites.types';

type FormDialogProps = {
    type: "add" | "edit";
    textBtn: string;
    dialogTitle: string;
    rowId?: string
}

const emptyValues: FavoritesTypes = {
    title: "",
    type: "",
    director: "",
    budget: "",
    location: "",
    duration: "",
    year: ""
}

export default function FormDialog({ type, textBtn, dialogTitle, rowId }: FormDialogProps) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();
    const { data: favoriteData, loading } = useAppSelector((state) => state.favorite);

    const handleData = () => {
        if (rowId) dispatch(fetchFavoriteById(rowId));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {type === "add" ?
                <Button variant="outlined" onClick={handleClickOpen}
                    className='btn centered font-family btn-primary !h-[38px]'>
                    <i className="fas fa-plus mr-1"></i> {textBtn}
                </Button>
                : <Button variant="contained" onClick={() => { handleClickOpen(); handleData() }}
                    className='btn centered font-family whitespace-nowrap !text-[12px] !text-primary !bg-[#32936F29] !h-[30px] !px-2'
                >
                    <i className="fas fa-pen-to-square mr-1"></i>{textBtn}
                </Button>
            }
            <Dialog
                open={open}
                onClose={(_, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
                maxWidth="sm"
                fullWidth={true}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                    {type === "add" ?
                        <EntryForm
                            closeDialog={handleClose}
                            submitBtn="Add"
                            isEdit={false}
                            defaultValues={emptyValues}
                        />
                        : !loading ?
                            <EntryForm
                                closeDialog={handleClose}
                                submitBtn="Update"
                                isEdit={true}
                                defaultValues={{
                                    ...favoriteData!,
                                    year: favoriteData?.year ? new Date(favoriteData.year) : "",
                                }}
                                id={favoriteData?.id}
                            />
                            : <ThreeDotsSpinner />
                    }
                </DialogContent>
        </Dialog>
        </React.Fragment>
    );
}
