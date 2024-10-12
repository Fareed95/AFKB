import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AddNewShop from '../pages/AddNewShop';
import { useNavigate } from 'react-router-dom'; // To navigate on logout

const pages = [
  { name: 'Add New Shop', action: 'openAddNewShop' },
  { name: 'Github', link: 'https://github.com/Fareed95/AFKB', external: true },
  { name: 'Developer', link: 'https://www.linkedin.com/in/fareed-sayed-b39936280/', external: false }
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenAddNewShop = () => {
    setOpenModal(true);
  };

  const handleCloseAddNewShop = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    // Clear JWT token and navigate to the login page
    localStorage.removeItem('jwt');
    navigate('/login'); // Assuming you have a login route
  };

  const isLoggedIn = !!localStorage.getItem('jwt'); // Check if JWT token exists

  return (
    <>
      <AppBar position="fixed" sx={{
        background: 'linear-gradient(to right, #4a90e2, #9013fe)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              AFKB
            </Typography>

            {/* Mobile Menu Icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="open navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={page.action === 'openAddNewShop' ? handleOpenAddNewShop : handleCloseNavMenu}
                  >
                    <Typography sx={{ textAlign: 'center' }}>
                      {page.external ? (
                        <a href={page.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                          {page.name}
                        </a>
                      ) : (
                        <span>{page.name}</span>
                      )}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={page.action === 'openAddNewShop' ? handleOpenAddNewShop : handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.external ? (
                    <a href={page.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                      {page.name}
                    </a>
                  ) : (
                    <span>{page.name}</span>
                  )}
                </Button>
              ))}
            </Box>

            {/* User Menu */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={isLoggedIn ? 'Logout' : 'Login'}>
                <Button
                  sx={{ color: 'white' }}
                  onClick={isLoggedIn ? handleLogout : () => navigate('/login')}
                >
                  {isLoggedIn ? 'Logout' : 'Login'}
                </Button>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Add New Shop Modal */}
      <AddNewShop open={openModal} handleClose={handleCloseAddNewShop} />
    </>
  );
}

export default ResponsiveAppBar;
