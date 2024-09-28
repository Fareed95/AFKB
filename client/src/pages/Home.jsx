import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/AppBar';
import MediaCard from '../components/MediaCard';
import AddNewShop from './AddNewShop';// Import the AddNewShop component
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

function Home() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/user', {
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

  const handleAddShopClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ResponsiveAppBar />
      <div style={{ padding: '20px', margin: '50px', textAlign: 'center' }}>
        <h2>Home Page</h2>
        {user ? (
          <div>
            <p>Email: {user.email}</p>
            <p>Name: {user.name}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {user.shops.map((shop) => (
                <MediaCard
                  key={shop.id}
                  title={shop.name}
                  description={shop.description}
                  image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                  id={shop.id}
                />
              ))}
            </div>
            <AddNewShop open={open} handleClose={handleClose} userEmail={user.email} />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Home;
