import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const AmountPaidModal = ({ open, handleClose, shopId }) => {
  const [shopData, setShopData] = useState({
    name: '',
    description: '',
    shirt_price: '',
    pants_price: '',
    safari_price: '',
    amount_paid: '',
    email: '',
  });

  // Fetch the shop data when the modal opens
  useEffect(() => {
    if (open && shopId) {
      fetch(`https://afkb.onrender.com/api/shops/${shopId}/`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setShopData({
            name: data.name || '',
            description: data.description || '',
            shirt_price: data.shirt_price || null,
            pants_price: data.pants_price || null,
            safari_price: data.safari_price || null,
            amount_paid: data.amount_paid || '',
            email: data.email || '',
          });
        })
        .catch(error => console.error('Error fetching shop data:', error));
    }
  }, [open, shopId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShopData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data in the required format
    const updatedData = {
      name: shopData.name,
      description: shopData.description,
      shirt_price: shopData.shirt_price || null,
      pants_price: shopData.pants_price || null,
      safari_price: shopData.safari_price || null,
      email: shopData.email,
      amount_paid: shopData.amount_paid || null,
    };

    // Log the data being sent in the PUT request
    console.log('Submitting data:', updatedData);

    // Make the PUT request to update the shop
    fetch(`https://afkb.onrender.com/api/shops/${shopId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update shop');
        }
        handleClose(); // Close the modal on success
      })
      .catch(error => console.error('Error updating shop:', error));
  };

  return (
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
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={shopData.email}
            onChange={handleInputChange}
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleClose} sx={{ mr: 2 }}>Cancel</Button>
            <Button type="submit" variant="contained">Submit</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AmountPaidModal;
