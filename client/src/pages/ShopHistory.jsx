// src/pages/ShopHistoryPage.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const ShopHistoryPage = () => {
  const { shopId } = useParams(); // Get shopId from URL parameters
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  useEffect(() => {
    const fetchHistory = async () => {
      try {
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
        const data = await response.json();
        const shopData = data.shops.find(shop => shop.id === Number(shopId)); // Ensure shopId is a number
        if (shopData) {
          setHistoryData(shopData.day_histories);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, [shopId]);

  return (
    <Box sx={{ padding: 2, margin: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Shop History</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Shirts Updated</TableCell>
              <TableCell>Pants Updated</TableCell>
              <TableCell>Safari Updated</TableCell>
              <TableCell>Each Day Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.shirts_updated}</TableCell>
                <TableCell>{row.pants_updated}</TableCell>
                <TableCell>{row.safari_updated}</TableCell>
                <TableCell>{row.each_day_total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>Back</Button> {/* Navigate back to the previous page */}
      </Box>
    </Box>
  );
};

export default ShopHistoryPage;
