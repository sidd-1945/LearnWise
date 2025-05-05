import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
} from '@mui/material';
import {
  AccessTime,
  Assignment,
  MenuBook,
  People,
  Star,
  Language,
  School,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';
import EnrollmentForm from '../components/EnrollmentForm/EnrollmentForm';

const Course = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Mock course data - in a real app, this would come from an API based on the id
  const courses = [
    {
      id: 1,
      title: 'Complete Design Systems',
      instructor: 'Emily Rodriguez',
      category: 'Design',
      rating: 4.8,
      students: 2345,
      duration: '10 weeks',
      price: 79.99,
      description: 'Learn to create comprehensive design systems that scale.',
      materials: 24,
      assignments: 12,
      language: 'English',
      level: 'Intermediate',
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      instructor: 'David Kim',
      category: 'Development',
      rating: 4.9,
      students: 3456,
      duration: '8 weeks',
      price: 89.99,
      description: 'Master advanced React patterns and best practices.',
      materials: 32,
      assignments: 16,
      language: 'English',
      level: 'Advanced',
    },
    {
      id: 3,
      title: 'Digital Marketing Strategy',
      instructor: 'Sarah Johnson',
      category: 'Marketing',
      rating: 4.7,
      students: 1890,
      duration: '6 weeks',
      price: 69.99,
      description: 'Develop effective digital marketing strategies.',
      materials: 18,
      assignments: 8,
      language: 'English',
      level: 'Beginner',
    },
    {
      id: 4,
      title: 'Deep Learning with PyTorch',
      instructor: 'Dr. Alex Chen',
      category: 'AI & Machine Learning',
      rating: 4.9,
      students: 2789,
      duration: '12 weeks',
      price: 99.99,
      description: 'Build deep learning models using PyTorch framework.',
      materials: 40,
      assignments: 20,
      language: 'English',
      level: 'Advanced',
    },
  ];

  const [enrollmentFormOpen, setEnrollmentFormOpen] = useState(false);

  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">Course not found</Typography>
      </Box>
    );
  }

  const handleEnroll = () => {
    if (!isAuthenticated) {
      // Store the course ID in session storage for redirect after login
      sessionStorage.setItem('enrollCourseId', id);
      navigate('/login');
    } else {
      setEnrollmentFormOpen(true);
    }
  };

  const handleEnrollmentFormClose = () => {
    setEnrollmentFormOpen(false);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Course Info */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Chip
                label={course.category}
                color="primary"
                size="small"
                sx={{ mb: 2 }}
              />
              <Typography variant="h4" gutterBottom>
                {course.title}
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary">
                {course.description}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={`https://i.pravatar.cc/150?u=${course.instructor}`}
                  sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { color: 'primary.main' },
                    }}
                    onClick={() =>
                      navigate(
                        `/instructor/${course.instructor.replace(/\s+/g, '-').toLowerCase()}`
                      )
                    }
                  >
                    {course.instructor}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating value={course.rating} readOnly size="small" />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      ({course.rating})
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTime color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Duration"
                        secondary={course.duration}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MenuBook color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Materials"
                        secondary={`${course.materials} lessons`}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Assignment color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Assignments"
                        secondary={`${course.assignments} tasks`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Language color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Language"
                        secondary={course.language}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Enrollment Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 24 }}>
            <CardContent>
              <Typography variant="h4" color="primary.main" gutterBottom>
                ${course.price}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleEnroll}
                sx={{ mb: 2 }}
              >
                {isAuthenticated ? 'Enroll Now' : 'Sign in to Enroll'}
              </Button>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <School sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2">{course.level} Level</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <People sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2">
                    {course.students.toLocaleString()} students
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary">
                30-day money-back guarantee
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <EnrollmentForm
        open={enrollmentFormOpen}
        onClose={handleEnrollmentFormClose}
        courseTitle={course.title}
      />
    </Box>
  );
};

export default Course;