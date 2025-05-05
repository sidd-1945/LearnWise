import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Avatar,
  AvatarGroup,
  Chip,
  LinearProgress,
  useTheme,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { PlayArrow, Timer, Group, TrendingUp } from '@mui/icons-material';

const featuredCourses = [
  {
    title: 'UI/UX Design Mastery',
    instructor: 'Sarah Anderson',
    students: 1234,
    duration: '8 weeks',
    progress: 0,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%232563EB"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">UI/UX Design</text></svg>',
  },
  {
    title: 'Advanced Web Development',
    instructor: 'Michael Chen',
    students: 892,
    duration: '12 weeks',
    progress: 0,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%237C3AED"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Web Dev</text></svg>',
  },
  {
    title: 'Machine Learning Fundamentals',
    instructor: 'Dr. Emily Zhang',
    students: 1567,
    duration: '10 weeks',
    progress: 0,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23059669"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">ML</text></svg>',
  },
  {
    title: 'Data Science & Analytics',
    instructor: 'Prof. James Wilson',
    students: 2103,
    duration: '14 weeks',
    progress: 0,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23DC2626"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Data Science</text></svg>',
  },
];

const learningStats = [
  {
    title: 'Learning Hours',
    value: '0',
    unit: 'hrs',
    trend: '',
    icon: <Timer />,
  },
  {
    title: 'Course Progress',
    value: '0',
    unit: '%',
    trend: '0%',
    icon: <TrendingUp />,
  },
  {
    title: 'Active Learners',
    value: '0',
    unit: '',
    trend: '82',
    icon: <Group />,
  },
];

const Home = () => {
  const theme = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <Box>
      {/* Welcome Section */}
      {isAuthenticated && (
        <Box
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[1],
            mb: 4,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}1A, ${theme.palette.secondary.main}1A)`,
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Welcome, {localStorage.getItem('userName') || localStorage.getItem('userEmail').split('@')[0] || 'User'}!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Ready to continue your learning journey? Here's what's new today.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrow />}
            href="/explore"
            sx={{ borderRadius: 2 }}
          >
            Start Learning
          </Button>
        </Box>
      )}

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {learningStats.map((stat) => (
          <Grid item xs={12} md={4} key={stat.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                p: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main + '1A',
                  color: theme.palette.primary.main,
                  mr: 2,
                }}
              >
                {stat.icon}
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <Typography variant="h4" component="span">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" component="span">
                    {stat.unit}
                  </Typography>
                  <Chip
                    label={stat.trend}
                    size="small"
                    color="success"
                    sx={{ ml: 1 }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Featured Courses */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Start Learning
      </Typography>
      <Grid container spacing={3}>
        {featuredCourses.map((course) => (
          <Grid item xs={12} md={6} key={course.title}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                height: '100%',
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: '100%', sm: 200 },
                  height: { xs: 200, sm: 'auto' },
                }}
                image={course.image}
                alt={course.title}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {course.instructor}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AvatarGroup
                    max={3}
                    sx={{
                      '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 12 },
                    }}
                  >
                    <Avatar>1</Avatar>
                    <Avatar>2</Avatar>
                    <Avatar>3</Avatar>
                    <Avatar>4</Avatar>
                  </AvatarGroup>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    {course.students.toLocaleString()} students
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">Progress</Typography>
                    <Typography variant="body2" color="primary">
                      {course.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={course.progress}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>

                <Button
                  variant="outlined"
                  startIcon={<PlayArrow />}
                  fullWidth
                  sx={{ mt: 'auto' }}
                >
                  Start Course
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;