import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/AppBar';
import MediaCard from '../components/MediaCard';
import AddNewShop from './AddNewShop'; // Import the AddNewShop component
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; // Import Typography for better text styling
import { Box } from '@mui/material'; // Import Box for layout styling
import Footer from '../components/Footer';


function Home() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch('https://afkb.onrender.com/api/user', {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        window.location.href = '/login';
      }
    };

    fetchUserData();
  }, []);

  // Open "Add New Shop" Dialog
  const handleAddShopClick = () => {
    setOpen(true);
  };

  // Close the "Add New Shop" Dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ResponsiveAppBar />
      <div style={{ padding: '20px', margin: '50px', textAlign: 'center' }}>
        {user ? (
          <Box>
            {/* Welcome Message */}
            <Typography variant="h4" gutterBottom>
              Welcome, {user.name}!
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Your Email: {user.email}
            </Typography>

            {/* Display Shops */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {user.shops && user.shops.length > 0 ? (
                user.shops.map((shop) => (
                  <MediaCard
                    key={shop.id}
                    title={shop.name}
                    description={shop.description}
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                    id={shop.id} // Pass shop ID
                  />
                ))
              ) : (
                <p>No shops available.</p>
              )}
            </div>

            {/* Add New Shop Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddShopClick}
              style={{ marginTop: '20px' }}
            >
              Add New Shop
            </Button>

            {/* Add New Shop Dialog */}
            <AddNewShop open={open} handleClose={handleClose} userEmail={user.email} />
          </Box>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer/>
    </>
  );
}

export default Home;
