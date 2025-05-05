import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import {
  Home,
  LibraryBooks,
  Explore,
  Notifications,
  Settings,
  ChevronLeft,
  School,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Home', icon: <Home />, path: '/' },
  { text: 'My Library', icon: <LibraryBooks />, path: '/library' },
  { text: 'Quiz', icon: <School />, path: '/quiz' },
  { text: 'Explore', icon: <Explore />, path: '/explore' },
  { 
    text: 'Notifications',
    icon: <Notifications />,
    path: '/notifications',
    secondaryText: 'No notifications right now'
  },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

const Sidebar = ({ open, onClose, drawerWidth }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          LearnHub
        </Typography>
        {isMobile && (
          <IconButton onClick={onClose} sx={{ ml: 1 }}>
            <ChevronLeft />
          </IconButton>
        )}
      </Box>

      <List sx={{ px: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) onClose();
                }}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive
                    ? theme.palette.primary.main + '1A'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: isActive
                      ? theme.palette.primary.main + '1A'
                      : theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  secondary={item.secondaryText}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: isActive ? 600 : 400,
                      color: isActive
                        ? theme.palette.text.primary
                        : theme.palette.text.secondary
                    },
                    '& .MuiListItemText-secondary': {
                      fontSize: '0.75rem',
                      fontStyle: 'italic',
                      color: theme.palette.text.secondary
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box
        sx={{
          p: 3,
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © 2024 LearnHub. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: theme.shadows[8],
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: theme.shadows[2],
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;