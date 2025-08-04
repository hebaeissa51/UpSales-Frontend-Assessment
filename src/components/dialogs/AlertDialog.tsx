import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { useState } from 'react';
import { fetchFavorites } from '../../store/slices/get/allFavoritesSlice';
import { useAppDispatch } from '../../hooks/redux';

export default function AlertDialog({ rowId }: { rowId: string }) {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenAlert(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/favorites/${rowId}`);
      setOpenAlert(true);
      setTimeout(() => dispatch(fetchFavorites()), 2000);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ zIndex: 1500 }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          <AlertTitle>Successful</AlertTitle>
          Item deleted successfully
        </Alert>
      </Snackbar>
      <Button variant="contained" onClick={handleClickOpen}
        className="btn centered font-family !text-[12px] !text-white !bg-[#F05252] !h-[30px] !px-2"
      >
        <i className='fas fa-trash mr-1'></i> Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className='flex items-center'>
            <i className="pi pi-exclamation-triangle mr-3 text-[#dc3545] text-[2rem]" />
            <span className="font-family text-[16px] leading-normal">Are you sure you want to delete this item?</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='mb-6 mx-3'>
          <Button
            onClick={handleClose}
            className='btn !bg-gray-200 !text-gray-700 !text-[16px] !px-4'
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            autoFocus
            className="btn btn-danger !text-[16px] !px-4"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
