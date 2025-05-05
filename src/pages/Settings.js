import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Grid,
  Button,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  DarkMode,
  Notifications,
  Language,
  Security,
  Email,
  Edit,
} from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: 'primary.main',
                    fontSize: '2.5rem',
                  }}
                >
                  {isAuthenticated && localStorage.getItem('userName') ? 
                    localStorage.getItem('userName').charAt(0).toUpperCase() : 'G'}
                </Avatar>
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Edit />
                </IconButton>
              </Box>
              <Typography variant="h6" gutterBottom>
                {isAuthenticated ? (localStorage.getItem('userName') || 'User Name') : 'Guest'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {isAuthenticated ? localStorage.getItem('userEmail') || 'user@example.com' : 'Not signed in'}
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Settings List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Preferences
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <DarkMode />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dark Mode"
                    secondary="Toggle dark/light theme"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={isDarkMode}
                      onChange={toggleTheme}
                    />
                  </ListItemSecondaryAction>
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem>
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText
                    primary="Notifications"
                    secondary="Manage notification preferences"
                  />
                  <ListItemSecondaryAction>
                    <Switch edge="end" defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive updates via email"
                  />
                  <ListItemSecondaryAction>
                    <Switch edge="end" defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem>
                  <ListItemIcon>
                    <Language />
                  </ListItemIcon>
                  <ListItemText
                    primary="Language"
                    secondary="English (US)"
                  />
                  <ListItemSecondaryAction>
                    <Button size="small">Change</Button>
                  </ListItemSecondaryAction>
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem>
                  <ListItemIcon>
                    <Security />
                  </ListItemIcon>
                  <ListItemText
                    primary="Security"
                    secondary="Password, 2FA, and security preferences"
                  />
                  <ListItemSecondaryAction>
                    <Button size="small">Manage</Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;