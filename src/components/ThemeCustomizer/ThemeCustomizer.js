import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Grid,
  Tooltip,
  Fab,
  Zoom,
} from '@mui/material';
import {
  Palette as PaletteIcon,
  Check as CheckIcon,
  Style as StyleIcon,
  FormatColorFill as ColorIcon,
} from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

const ThemeCustomizer = () => {
  const [open, setOpen] = useState(false);
  const { toggleTheme, isDarkMode, primaryColor, changeColor } = useTheme();

  const themeColors = [
    { name: 'Blue', color: '#1976d2' },
    { name: 'Purple', color: '#9c27b0' },
    { name: 'Green', color: '#2e7d32' },
    { name: 'Orange', color: '#ed6c02' },
    { name: 'Red', color: '#d32f2f' },
    { name: 'Teal', color: '#009688' },
  ];

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleColorSelect = (color) => {
    changeColor(color);
  };

  return (
    <>
      <Zoom in={true}>
        <Fab
          color="primary"
          aria-label="customize theme"
          onClick={handleClickOpen}
          sx={{
            position: 'fixed',
            right: 20,
            bottom: 20,
            backgroundColor: primaryColor,
            '&:hover': {
              backgroundColor: primaryColor,
              filter: 'brightness(0.9)',
            },
          }}
        >
          <PaletteIcon />
        </Fab>
      </Zoom>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="theme-customizer-dialog"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="theme-customizer-dialog">
          <Box display="flex" alignItems="center" gap={1}>
            <StyleIcon />
            <Typography variant="h6">Customize Theme</Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              <Box display="flex" alignItems="center" gap={1}>
                <ColorIcon fontSize="small" />
                Theme Colors
              </Box>
            </Typography>
            <Grid container spacing={1}>
              {themeColors.map((themeColor) => (
                <Grid item key={themeColor.color}>
                  <Tooltip title={themeColor.name} arrow>
                    <IconButton
                      onClick={() => handleColorSelect(themeColor.color)}
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: themeColor.color,
                        '&:hover': {
                          backgroundColor: themeColor.color,
                          filter: 'brightness(0.9)',
                        },
                        border: primaryColor === themeColor.color ? '2px solid white' : 'none',
                        boxShadow: primaryColor === themeColor.color ? '0 0 0 2px #000' : 'none',
                      }}
                    >
                      {primaryColor === themeColor.color && (
                        <CheckIcon sx={{ color: '#fff' }} />
                      )}
                    </IconButton>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Theme Mode
            </Typography>
            <Button
              variant="outlined"
              onClick={toggleTheme}
              startIcon={<PaletteIcon />}
              fullWidth
            >
              Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ThemeCustomizer;