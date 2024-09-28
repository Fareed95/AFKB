import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/AppBar';
import MediaCard from '../components/MediaCard';

function Home() {
  const [user, setUser] = useState(null);

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
        // Handle errors (e.g., token expired)
        window.location.href = '/login';
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <div style={{ padding: '20px', margin: '50px', textAlign: 'center' }}>
        <h2>Home Page</h2>
        {user ? (
          <div>
            <p>Email: {user.email}</p>
            <p>Name: {user.name}</p>

            {/* Loop through the user's shops and display each one */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {user.shops.map((shop) => (
                <MediaCard
                  key={shop.id} // Unique key for each shop
                  title={shop.name} // Pass shop name as title
                  description={shop.description} // Pass shop description
                  image="https://mui.com/static/images/cards/contemplative-reptile.jpg" // You can replace this with a dynamic image if available
                  id={shop.id} // Pass shop ID to generate correct URL for billing
                />
              ))}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Home;
