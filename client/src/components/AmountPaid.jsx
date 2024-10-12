import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AmountPaidModal = ({ open, handleClose, shopId }) => {
  const [shopData, setShopData] = useState({
    amount_paid: '',
  });
  const [isLoading, setIsLoading] = useState(false); // To show loading state if needed

  // Fetch the shop data when the modal opens
  useEffect(() => {
    if (open && shopId) {
      fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/shops/${shopId}/`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setShopData({
            amount_paid: data.amount_paid || '',
          });
        })
        .catch(error => console.error('Error fetching shop data:', error));
    }
  }, [open, shopId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShopData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading state

    // Prepare the data in the required format
    const updatedData = {
      amount_paid: shopData.amount_paid || null,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/shops/${shopId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        // Show success toast
        toast.success('Amount updated successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        handleClose(); // Close the modal after success
      } else {
        throw new Error('Failed to update shop');
      }
    } catch (error) {
      // Show error toast
      toast.error('Error updating the amount!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          width: 400,
          padding: 4,
          bgcolor: 'white',
          margin: 'auto',
          mt: '10%',
          borderRadius: 2,
          boxShadow: 3,
        }}>
          <Typography variant="h6" component="h2">
            Update Amount Paid
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Amount Paid"
              name="amount_paid"
              value={shopData.amount_paid}
              onChange={handleInputChange}
              required
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleClose} sx={{ mr: 2 }} disabled={isLoading}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Submit'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Toast container for displaying notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        theme="light"
      />
    </>
  );
};

export default AmountPaidModal;
