import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Badge,
  Button,
  Typography,
  useTheme,
  alpha,
  styled,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const Header = ({ onSidebarOpen }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const theme = useTheme();
  const { isDarkMode, toggleTheme, primaryColor } = useCustomTheme();
  const { isAuthenticated, logout } = useAuth();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - 280px)` },
        ml: { md: '280px' },
        backdropFilter: 'blur(6px)',
        backgroundColor: 'background.default',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onSidebarOpen}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {!isAuthenticated && (
            <>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/login')}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  mr: 1
                }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/signup')}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  mr: 2
                }}
              >
                Sign Up
              </Button>
            </>
          )}

          <IconButton
            onClick={toggleTheme}
            sx={{
              color: primaryColor,
              '&:hover': { backgroundColor: `${primaryColor}10` },
            }}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <IconButton
            sx={{
              color: primaryColor,
              '&:hover': { backgroundColor: `${primaryColor}10` },
            }}
            onClick={(event) => setNotificationAnchorEl(event.currentTarget)}
          >
            <Badge badgeContent={null} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={() => setNotificationAnchorEl(null)}
            onClick={() => setNotificationAnchorEl(null)}
            PaperProps={{
              sx: {
                width: 300,
                maxHeight: 400,
                overflow: 'auto',
              },
            }}
          >
            <MenuItem sx={{ justifyContent: 'center' }}>
              <Typography 
                variant="body2" 
                color="primary"
                sx={{ 
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  '&:hover': { opacity: 0.8 }
                }}
                onClick={() => navigate('/notifications')}
              >
                No notifications right now
              </Typography>
            </MenuItem>
          </Menu>

          <IconButton
            edge="end"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: theme.palette.primary.main,
              }}
            >
              {isAuthenticated && localStorage.getItem('userName') ? 
                localStorage.getItem('userName').charAt(0).toUpperCase() : 'G'}
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 180,
              borderRadius: 2,
              boxShadow: theme.shadows[8],
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>My Account</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;