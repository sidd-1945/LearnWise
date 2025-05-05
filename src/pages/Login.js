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

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real app, you would make an API call here
    console.log('Form submitted:', formData);
    localStorage.setItem('userEmail', formData.email);
    login(); // Log the user in after successful login
    
    // Check if there's a redirect after enrollment
    const enrollCourseId = sessionStorage.getItem('enrollCourseId');
    if (enrollCourseId) {
      sessionStorage.removeItem('enrollCourseId');
      navigate(`/course/${enrollCourseId}`);
    } else {
      navigate('/');
    }
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
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Sign in to continue learning
          </Typography>

          <form onSubmit={handleSubmit}>
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mb: 2 }}
            >
              Sign In
            </Button>

            <Box sx={{ textAlign: 'right', mb: 3 }}>
              <Link href="#" underline="hover" variant="body2">
                Forgot Password?
              </Link>
            </Box>

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
                  localStorage.setItem('userEmail', 'google.user@gmail.com');
                  login(); // Log the user in after successful Google login
                  navigate('/');
                }}
              >
                Sign in with Google
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GitHubIcon />}
                sx={{ mb: 2 }}
                onClick={() => {
                  localStorage.setItem('userEmail', 'github.user@github.com');
                  login(); // Log the user in after successful GitHub login
                  navigate('/');
                }}
              >
                Sign in with GitHub
              </Button>
            </Box>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/signup')}
                underline="hover"
              >
                Sign up
              </Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;