import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { toast } from 'react-toastify'; // Import toast

// Styled components for a better aesthetic
const StyledDialogTitle = styled(DialogTitle)({
  background: 'linear-gradient(to right, #4a90e2, #9013fe)',
  color: 'white',
  textAlign: 'center',
});

const StyledTextField = styled(TextField)({
  marginBottom: '16px', // Space between fields
});

const StyledButton = styled(Button)({
  backgroundColor: '#4a90e2',
  color: 'white',
  '&:hover': {
    backgroundColor: '#3c7dca', // Darker shade on hover
  },
});

const AddNewShop = ({ open, handleClose, userEmail }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shirt_price: null,
    pants_price: null,
    safari_price: null,
    email: userEmail || "", // Initialize with userEmail or empty string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = { ...formData };

    // Log the data to be sent to the API
    console.log('Data to send:', dataToSend);

    try {
      const response = await fetch("https://afkb.onrender.com/api/shops/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(`Network response was not ok: ${errorData.detail || errorData}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      handleClose(); // Close the modal after submission

      // Show success toast with shop name
      toast.success(`Shop "${formData.name}" added successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add shop. Please check the console for more details.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <StyledDialogTitle>Add New Shop</StyledDialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            autoFocus
            margin="dense"
            label="Shop Name"
            type="text"
            name="name"
            fullWidth
            variant="outlined"
            required
            onChange={handleChange}
          />
          <StyledTextField
            margin="dense"
            label="Description"
            type="text"
            name="description"
            fullWidth
            variant="outlined"
            required
            onChange={handleChange}
          />
          <StyledTextField
            margin="dense"
            label="Shirt Price"
            type="number"
            name="shirt_price"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <StyledTextField
            margin="dense"
            label="Pants Price"
            type="number"
            name="pants_price"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <StyledTextField
            margin="dense"
            label="Safari Price"
            type="number"
            name="safari_price"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <StyledTextField
            margin="dense"
            label="Email"
            type="email"
            name="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required // Mark it as required if needed
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <StyledButton type="submit" onClick={handleSubmit}>
          Add
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewShop;
