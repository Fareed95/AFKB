import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import UpdateShop from './UpdateShop';
import AmountPaidModal from './AmountPaid'; // Import the new modal

export default function MediaCard({ title, description, image, id }) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAmountPaid, setOpenAmountPaid] = useState(false); // State for the Amount Paid modal

  const handleUpdateClick = () => {
    console.log('Update clicked for shop:', title);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleGenerateBill = () => {
    console.log('Generating bill for shop ID:', id);
    window.location.href = `http://localhost:8000/api/invoice/${id}/`;
  };

  const handleAmountPaidClick = () => {
    console.log('Amount Paid clicked for shop:', title);
    setOpenAmountPaid(true); // Open the Amount Paid modal
  };

  const handleCloseAmountPaid = () => {
    setOpenAmountPaid(false); // Close the Amount Paid modal
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        transition: 'transform 0.3s ease',
        margin: '20px',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <CardMedia
        sx={{
          height: 180,
          borderRadius: '16px 16px 0 0',
          objectFit: 'cover',
        }}
        component="img"
        image={image}
        title={title}
      />
      <CardContent sx={{ padding: '16px' }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', color: '#333' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#666', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ margin: 'auto' }}>
          <Button
            size="small"
            sx={{ color: '#1976d2', fontWeight: 'bold', '&:hover': { color: '#1259a7' } }}
            onClick={handleUpdateClick}
          >
            Update
          </Button>
          <Button
            size="small"
            sx={{ color: '#1976d2', fontWeight: 'bold', '&:hover': { color: '#1259a7' } }}
            onClick={handleGenerateBill}
          >
            Generate Bill
          </Button>
          <Button
            size="small"
            sx={{ color: '#1976d2', fontWeight: 'bold', '&:hover': { color: '#1259a7' } }}
            onClick={handleAmountPaidClick}
          >
            Amount Paid
          </Button>
        </Box>
      </CardActions>

      {/* UpdateShop Modal */}
      <UpdateShop open={openUpdate} handleClose={handleCloseUpdate} shopId={id} />
      {/* AmountPaid Modal */}
      <AmountPaidModal open={openAmountPaid} handleClose={handleCloseAmountPaid} shopId={id} />
    </Card>
  );
}
