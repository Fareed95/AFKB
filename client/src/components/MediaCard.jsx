import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

export default function MediaCard({ title, description, image, id }) {
  // Function to handle Generate Bill button click
  const handleGenerateBill = () => {
    // Redirecting to the invoice URL with the shop ID
    window.location.href = `http://localhost:8000/api/invoice/${id}`;
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        transition: 'transform 0.3s ease',
        margin: '20px', // Added margin for spacing between cards
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
        image={image} // Using dynamic image prop
        title={title} // Dynamic title for accessibility
      />
      <CardContent sx={{ padding: '16px' }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontWeight: 'bold',
            fontFamily: 'Roboto, sans-serif',
            color: '#333',
          }}
        >
          {title} {/* Dynamic title */}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#666',
            fontFamily: 'Arial, sans-serif',
            lineHeight: '1.6',
          }}
        >
          {description} {/* Dynamic description */}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ margin: 'auto' }}>
          <Button
            size="small"
            sx={{
              color: '#1976d2',
              fontWeight: 'bold',
              '&:hover': { color: '#1259a7' },
            }}
          >
            Update
          </Button>
          <Button
            size="small"
            sx={{
              color: '#1976d2',
              fontWeight: 'bold',
              '&:hover': { color: '#1259a7' },
            }}
            onClick={handleGenerateBill} // Trigger the function when clicked
          >
            Generate Bill
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
