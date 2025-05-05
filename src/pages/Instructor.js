import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from '@mui/material';
import {
  School,
  Star,
  Language,
  Verified,
} from '@mui/icons-material';

const Instructor = () => {
  const { name } = useParams();
  const theme = useTheme();

  // Mock instructor data - in a real app, this would come from an API
  const instructor = {
    name: name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    title: 'Machine Learning Expert & Senior Data Scientist',
    rating: 4.9,
    students: 15678,
    coursesCount: 8,
    experience: '10+ years',
    bio: 'Experienced data scientist and educator with a passion for making complex concepts accessible to everyone. Specializing in machine learning, deep learning, and artificial intelligence.',
    expertise: [
      'Machine Learning',
      'Deep Learning',
      'Neural Networks',
      'Python',
      'Data Science',
      'AI Applications',
    ],
    courses: [
      {
        title: 'Advanced Machine Learning',
        students: 2789,
        rating: 4.9,
        category: 'AI & Machine Learning',
      },
      {
        title: 'Deep Learning with PyTorch',
        students: 1890,
        rating: 4.8,
        category: 'AI & Machine Learning',
      },
      {
        title: 'Neural Networks Masterclass',
        students: 2345,
        rating: 4.7,
        category: 'AI & Machine Learning',
      },
    ],
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Instructor Profile */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src={`https://i.pravatar.cc/300?u=${instructor.name}`}
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto 16px',
                  border: `4px solid ${theme.palette.primary.main}`,
                }}
              />
              <Typography variant="h5" gutterBottom>
                {instructor.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                {instructor.title}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  mb: 2,
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{instructor.coursesCount}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Courses
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">
                    {instructor.students.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Students
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{instructor.rating}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Chip
                  icon={<Verified />}
                  label="Verified Instructor"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Instructor Details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About Me
              </Typography>
              <Typography variant="body1" paragraph>
                {instructor.bio}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Areas of Expertise
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {instructor.expertise.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </Box>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <School color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Teaching Experience"
                    secondary={instructor.experience}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Language color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Languages"
                    secondary="English, Mandarin"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Typography variant="h6" gutterBottom>
            Popular Courses
          </Typography>
          <Grid container spacing={2}>
            {instructor.courses.map((course, index) => (
              <Grid item xs={12} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { color: 'primary.main' },
                      }}
                      onClick={() => window.location.href = `/course/${index + 1}`}
                    >
                      {course.title}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Chip
                        label={course.category}
                        size="small"
                        color="primary"
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Star
                          sx={{ color: theme.palette.warning.main, mr: 0.5 }}
                        />
                        <Typography variant="body2">{course.rating}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {course.students.toLocaleString()} students
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Instructor;