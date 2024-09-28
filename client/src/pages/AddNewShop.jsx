import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

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
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shirt_price: null,
    pants_price: null,
    safari_price: null,
    amount_paid: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Include email in the form data
    const dataToSend = { ...formData, email: userEmail };

    // Send POST request
    try {
      const response = await fetch("http://localhost:8000/api/shops/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Optionally handle the response here
      const data = await response.json();
      console.log('Success:', data);
      handleClose(); // Close the modal after submission
    } catch (error) {
      console.error('Error:', error);
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
            name="name" // Added name attribute for easy handling
            fullWidth
            variant="outlined"
            required
            onChange={handleChange}
          />
          <StyledTextField
            margin="dense"
            label="Description"
            type="text"
            name="description" // Added name attribute for easy handling
            fullWidth
            variant="outlined"
            required
            onChange={handleChange}
          />
          <StyledTextField
            margin="dense"
            label="Shirt Price"
            type="number"
            name="shirt_price" // Added name attribute for easy handling
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <StyledTextField
            margin="dense"
            label="Pants Price"
            type="number"
            name="pants_price" // Added name attribute for easy handling
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <StyledTextField
            margin="dense"
            label="Safari Price"
            type="number"
            name="safari_price" // Added name attribute for easy handling
            fullWidth
            variant="outlined"
            onChange={handleChange}
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
