import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './customtoast.css'; // Make sure to create this CSS file

export default function UpdateShop({ open, handleClose, shopId }) {
  const [shirtsUpdated, setShirtsUpdated] = useState('');
  const [pantsUpdated, setPantsUpdated] = useState('');
  const [safariUpdated, setSafariUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Prevent further submissions while loading
    if (isLoading) return;

    setIsLoading(true);
    const updateData = {
      shop: shopId,
      shirts_updated: shirtsUpdated,
      pants_updated: pantsUpdated,
      safari_updated: safariUpdated,
    };

    try {
      const response = await fetch('https://afkb.onrender.com/api/days/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Display success toast
        toast.success(
          `Shirts: ${shirtsUpdated || 0}, Pants: ${pantsUpdated || 0}, Safari: ${safariUpdated || 0} updated successfully!`,
          {
            position: "top-right",
            autoClose: 3000, // Auto-close after 3 seconds
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          }
        );

        handleClose(); // Close the dialog after success
        resetForm(); // Reset the form values after success
      } else {
        toast.error('Failed to update shop data.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error('Error occurred while updating.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setIsLoading(false); // Reset loading state regardless of outcome
    }
  };

  // Reset form values
  const resetForm = () => {
    setShirtsUpdated('');
    setPantsUpdated('');
    setSafariUpdated('');
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Shop Data</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Shirts Updated"
            type="number"
            fullWidth
            value={shirtsUpdated}
            onChange={(e) => setShirtsUpdated(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Pants Updated"
            type="number"
            fullWidth
            value={pantsUpdated}
            onChange={(e) => setPantsUpdated(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Safari Updated"
            type="number"
            fullWidth
            value={safariUpdated}
            onChange={(e) => setSafariUpdated(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast container for displaying notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        theme="dark"
      />
    </>
  );
}
