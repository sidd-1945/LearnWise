import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'agreeToTerms' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real app, you would make an API call here
    console.log('Form submitted:', formData);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
    login(); // Log the user in after successful signup
    navigate('/'); // Redirect to home page
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 8,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Create Account
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Join our learning community today
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>

            <TextField
              name="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 3 }}
            />

            <TextField
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  sx={{ mt: 0.5 }}
                />
              }
              label={
                <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" component="span">
                    I agree to the{' '}
                    <Link href="#" underline="hover">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="#" underline="hover">
                      Privacy Policy
                    </Link>
                  </Typography>
                  <Typography
                    component="span"
                    color="error"
                    sx={{ ml: 0.5, lineHeight: 1 }}
                  >
                    *
                  </Typography>
                </Box>
              }
              sx={{
                mb: 3,
                alignItems: 'flex-start',
                '& .MuiFormControlLabel-label': {
                  mt: 0.5
                }
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mb: 2 }}
            >
              Sign Up
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{ mb: 2 }}
                onClick={() => {
                  login(); // Log the user in after successful Google signup
                  navigate('/');
                }}
              >
                Sign up with Google
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GitHubIcon />}
                sx={{ mb: 2 }}
                onClick={() => {
                  login(); // Log the user in after successful GitHub signup
                  navigate('/');
                }}
              >
                Sign up with GitHub
              </Button>
            </Box>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/login')}
                underline="hover"
              >
                Sign in
              </Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;