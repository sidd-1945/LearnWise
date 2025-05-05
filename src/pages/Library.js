import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Tab,
  Tabs,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
  Button,
  useTheme,
} from '@mui/material';
import {
  MoreVert,
  PlayCircleOutline,
  Download,
  Assignment,
  MenuBook,
} from '@mui/icons-material';

const courses = [];

const Library = () => {
  const [selectedTab, setSelectedTab] = useState('In Progress');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleMenuClick = (event, course) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedCourse(course);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedCourse(null);
  };

  const filteredCourses = courses.filter(
    (course) => course.category === selectedTab
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        My Library
      </Typography>

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{
          mb: 4,
          '& .MuiTab-root': {
            minWidth: 'auto',
            px: 3,
            py: 1,
            borderRadius: 2,
            mr: 1,
            color: 'text.secondary',
            '&.Mui-selected': {
              color: 'primary.main',
              bgcolor: 'primary.main' + '1A',
            },
          },
          '& .MuiTabs-indicator': { display: 'none' },
        }}
      >
        <Tab label="In Progress" value="In Progress" />
        <Tab label="Completed" value="Completed" />
        <Tab label="Not Started" value="Not Started" />
      </Tabs>

      {filteredCourses.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Ready to start your journey? Welcome user
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/explore"
            sx={{ mt: 2 }}
          >
            Start Course
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredCourses.map((course) => (
            <Grid item xs={12} key={course.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">{course.title}</Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, course)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>

                  {course.category !== 'Not Started' && (
                    <Box sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2">
                          0 of {course.totalModules} modules
                        </Typography>
                        <Typography variant="body2" color="primary">
                          0%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={0}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  )}

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 3,
                          flexWrap: 'wrap',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <MenuBook sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="body2">
                            {course.materials} Materials
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Assignment sx={{ mr: 1, color: 'secondary.main' }} />
                          <Typography variant="body2">
                            {course.assignments} Assignments
                          </Typography>
                        </Box>
                        {course.lastAccessed && (
                          <Typography variant="body2" color="text.secondary">
                            Last accessed {course.lastAccessed}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{
                        display: 'flex',
                        justifyContent: { xs: 'flex-start', md: 'flex-end' },
                      }}
                    >
                      {course.category === 'In Progress' && (
                        <Button
                          variant="contained"
                          startIcon={<PlayCircleOutline />}
                          sx={{ mr: 1 }}
                        >
                          Start Course
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        startIcon={<Download />}
                        color="secondary"
                      >
                        Materials
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 180,
            boxShadow: theme.shadows[8],
          },
        }}
      >
        <MenuItem>View Details</MenuItem>
        <MenuItem>Share Course</MenuItem>
        <MenuItem>Add to Favorites</MenuItem>
        {selectedCourse?.category === 'Not Started' && (
          <MenuItem>Remove from Library</MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default Library;