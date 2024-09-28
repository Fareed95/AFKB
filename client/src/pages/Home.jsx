import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/AppBar';
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
            method: 'GET', // Use GET method for fetching user data
            headers: {
                Authorization: `${token}`, // Ensure this is the correct format
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
    <ResponsiveAppBar/>
    <div style={{ padding: '20px', margin: '50px',textAlign: 'center' }}>
      <h2>Home Page</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Name: {user.name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
}

export default Home;
