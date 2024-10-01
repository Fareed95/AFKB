import * as React from 'react';
import { AppProvider, SignInPage } from '@toolpad/core';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

export default function SlotPropsSignIn() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSignIn = async (provider, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('http://54.211.219.118:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('jwt', data.jwt);
        navigate('/home');
    } catch (error) {
        alert(error.message);
        console.error('Login error:', error);
    }
};


  return (
    <AppProvider theme={theme}>
      <div style={{ backgroundColor: '#242424', minHeight: '100vh', padding: '20px', color: 'white' }}>
        <SignInPage
          signIn={handleSignIn}
          slotProps={{
            emailField: { variant: 'standard', fullWidth: true },
            passwordField: { variant: 'standard', fullWidth: true },
            submitButton: { variant: 'outlined', fullWidth: true },
          }}
          providers={providers}
        />
      </div>
    </AppProvider>
  );
}
