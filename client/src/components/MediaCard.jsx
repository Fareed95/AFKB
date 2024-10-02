import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import UpdateShop from './UpdateShop'; // Assuming these components are available
import AmountPaidModal from './AmountPaid' ; // Assuming these components are available

const MediaCard = ({ title, description, image, id }) => {
  const navigate = useNavigate(); // Initialize navigate
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAmountPaid, setOpenAmountPaid] = useState(false);

  const handleUpdateClick = () => {
    setOpenUpdate(true);
  };

  const handleGenerateBill = () => {
    window.location.href = `https://afkb.onrender.com/api/invoice/${id}/`;
  };

  const handleAmountPaidClick = () => {
    setOpenAmountPaid(true);
  };

  const handleHistoryClick = () => {
    navigate(`/shop-history/${id}`); // Navigate to ShopHistoryPage with the shopId
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
          <Button
            size="small"
            sx={{ color: '#1976d2', fontWeight: 'bold', '&:hover': { color: '#1259a7' } }}
            onClick={handleHistoryClick} // Navigate to Shop History Page
          >
            History
          </Button>
        </Box>
      </CardActions>

      {/* UpdateShop Modal */}
      <UpdateShop open={openUpdate} handleClose={() => setOpenUpdate(false)} shopId={id} />
      {/* AmountPaid Modal */}
      <AmountPaidModal open={openAmountPaid} handleClose={() => setOpenAmountPaid(false)} shopId={id} />
    </Card>
  );
};

export default MediaCard;
