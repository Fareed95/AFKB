import React, { useEffect, useState } from 'react';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        // Redirect to login if no token
        window.location.href = '/login';
        return;
      }


      const response = await fetch('http://localhost:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
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
    <div style={{ padding: '20px', textAlign: 'center' }}>
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
  );
}

export default Home;
