import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EnrollmentForm from '../components/EnrollmentForm/EnrollmentForm';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  Rating,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Search,
  People,
  AccessTime,
  Bookmark,
  BookmarkBorder,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

const categories = [
  'All',
  'Design',
  'Development',
  'Data Science',
  'AI & Machine Learning',
  'Business',
  'Marketing',
  'Personal Growth',
  'Cloud Computing',
  'Cybersecurity',
];

const courses = [
  // Programming Courses
  {
    id: 11,
    title: 'Advanced Java Programming',
    instructor: 'John Smith',
    category: 'Development',
    rating: 4.9,
    students: 2890,
    duration: '12 weeks',
    price: 14.99,
    description: 'Master advanced Java concepts including multithreading, design patterns, microservices, and enterprise application development. Build scalable applications using Spring Boot and learn best practices for production-ready code.',
    topics: ['Multithreading', 'Design Patterns', 'Spring Boot', 'Microservices', 'Enterprise Java'],
    prerequisites: ['Basic Java knowledge', 'Object-oriented programming concepts'],
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23E11D48"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Advanced Java</text></svg>',
    saved: false,
  },
  {
    id: 12,
    title: 'Core Java Fundamentals',
    instructor: 'Emma Davis',
    category: 'Development',
    rating: 4.8,
    students: 3450,
    duration: '10 weeks',
    price: 12.99,
    description: 'Learn Java programming from scratch. Cover core concepts like OOP, collections, exception handling, and file I/O. Build a strong foundation with hands-on projects and real-world applications.',
    topics: ['OOP Basics', 'Collections Framework', 'Exception Handling', 'File I/O', 'Basic GUI'],
    prerequisites: ['No prior programming experience required'],
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23DB2777"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Core Java</text></svg>',
    saved: false,
  },
  {
    id: 13,
    title: 'Python Programming Masterclass',
    instructor: 'Michael Brown',
    category: 'Development',
    rating: 4.9,
    students: 4120,
    duration: '14 weeks',
    price: 14.99,
    description: 'Comprehensive Python course covering everything from basics to advanced topics. Learn web development with Django, data analysis with pandas, and automation with Python scripts.',
    topics: ['Python Basics', 'Django Web Development', 'Data Analysis', 'Automation', 'API Development'],
    prerequisites: ['Basic computer skills', 'No programming experience needed'],
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%234F46E5"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Python</text></svg>',
    saved: false,
  },
  {
    id: 14,
    title: 'Frontend Web Development',
    instructor: 'Sophie Taylor',
    category: 'Development',
    rating: 4.8,
    students: 2765,
    duration: '16 weeks',
    price: 13.99,
    description: 'Complete frontend development bootcamp. Master HTML5, CSS3, JavaScript, and modern frameworks like React. Learn responsive design, CSS animations, and state management.',
    topics: ['HTML5 & CSS3', 'JavaScript ES6+', 'React', 'Responsive Design', 'State Management'],
    prerequisites: ['Basic HTML and CSS knowledge recommended'],
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23059669"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Frontend Dev</text></svg>',
    saved: false,
  },


  // Mobile Development Courses
  {
    id: 7,
    description: 'Learn iOS app development using Swift programming language. Build real-world applications, master UI/UX principles, and publish apps to the App Store. Includes SwiftUI and UIKit frameworks.',
    topics: ['Swift Programming', 'iOS Development', 'SwiftUI', 'UIKit', 'App Store Deployment'],
    prerequisites: ['Basic programming knowledge', 'Mac computer required'],
    title: 'iOS App Development with Swift',
    instructor: 'Michael Swift',
    category: 'Development',
    rating: 4.8,
    students: 2156,
    duration: '12 weeks',
    price: 14.99,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23F43F5E"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">iOS Dev</text></svg>',
    saved: false,
  },
  {
    id: 8,
    description: 'Dive into blockchain technology and smart contract development. Learn Solidity, Web3.js, and build decentralized applications (DApps). Understand cryptocurrency fundamentals and blockchain architecture.',
    topics: ['Blockchain Basics', 'Smart Contracts', 'Solidity', 'Web3.js', 'DApp Development'],
    prerequisites: ['JavaScript knowledge', 'Basic cryptography understanding'],
    title: 'Blockchain Development',
    instructor: 'Robert Chen',
    category: 'Development',
    rating: 4.9,
    students: 1876,
    duration: '10 weeks',
    price: 94.99,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%238B5CF6"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Blockchain</text></svg>',
    saved: false,
  },
  {
    id: 9,
    description: 'Master the art of UI animation and motion design. Learn principles of animation, create engaging user interfaces, and implement smooth transitions. Covers tools like After Effects and Principle.',
    topics: ['Animation Principles', 'Motion Design', 'Interaction Design', 'After Effects', 'Prototyping'],
    prerequisites: ['Basic design skills', 'UI/UX fundamentals'],
    title: 'UI Animation & Motion Design',
    instructor: 'Lisa Anderson',
    category: 'Design',
    rating: 4.7,
    students: 2345,
    duration: '8 weeks',
    price: 74.99,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23EC4899"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">UI Animation</text></svg>',
    saved: false,
  },
  {
    id: 10,
    description: 'Learn modern DevOps practices and CI/CD pipeline implementation. Master tools like Docker, Kubernetes, Jenkins, and Git. Implement automated testing and deployment strategies.',
    topics: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'Automated Testing'],
    prerequisites: ['Basic Linux knowledge', 'Command line experience'],
    title: 'DevOps & CI/CD Pipeline',
    instructor: 'Tom Jenkins',
    category: 'Development',
    rating: 4.8,
    students: 1654,
    duration: '10 weeks',
    price: 89.99,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%2310B981"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">DevOps</text></svg>',
    saved: false,
  },
  // Design & Development Courses
  {
    id: 1,
    description: 'Learn to create comprehensive design systems for digital products. Master component libraries, style guides, and design tokens. Implement systematic approaches to UI/UX design.',
    topics: ['Design Systems', 'Component Libraries', 'Style Guides', 'Design Tokens', 'Design Documentation'],
    prerequisites: ['Basic design knowledge', 'Familiarity with design tools'],
    title: 'Complete Design Systems',
    instructor: 'Emily Rodriguez',
    category: 'Design',
    rating: 4.8,
    students: 2345,
    duration: '10 weeks',
    price: 12.99,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%232563EB"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Design Systems</text></svg>',
    saved: false,
  },
  {
    id: 2,
    description: 'Master advanced React patterns and best practices. Learn hooks, context, Redux, and performance optimization. Build scalable and maintainable React applications.',
    topics: ['React Hooks', 'Context API', 'Redux', 'Performance Optimization', 'Custom Hooks'],
    prerequisites: ['React basics', 'JavaScript ES6+'],
    title: 'Advanced React Patterns',
    instructor: 'David Kim',
    category: 'Development',
    rating: 4.9,
    students: 3456,
    duration: '8 weeks',
    price: 13.99,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%237C3AED"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">React Patterns</text></svg>',
    saved: false,
  },
  {
    id: 3,
    description: 'Develop comprehensive digital marketing strategies. Learn SEO, social media marketing, content strategy, and analytics. Create effective marketing campaigns.',
    topics: ['SEO', 'Social Media Marketing', 'Content Strategy', 'Analytics', 'Email Marketing'],
    prerequisites: ['Basic marketing knowledge', 'Social media familiarity'],
    title: 'Digital Marketing Strategy',
    instructor: 'Sarah Johnson',
    category: 'Marketing',
    rating: 4.7,
    students: 1890,
    duration: '6 weeks',
    price: 69.99,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23059669"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Marketing</text></svg>',
    saved: false,
  },
  {
    id: 4,
    description: 'Master deep learning with PyTorch framework. Implement neural networks, CNN, RNN, and transformers. Build AI models for computer vision and NLP tasks.',
    topics: ['Neural Networks', 'CNN', 'RNN', 'Transformers', 'Computer Vision'],
    prerequisites: ['Python programming', 'Basic machine learning concepts'],
    title: 'Deep Learning with PyTorch',
    instructor: 'Dr. Alex Chen',
    category: 'AI & Machine Learning',
    rating: 4.9,
    students: 2789,
    duration: '12 weeks',
    price: 99.99,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23DC2626"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Deep Learning</text></svg>',
    saved: false,
  },
  {
    id: 5,
    description: 'Comprehensive data science course using Python. Learn data analysis, visualization, machine learning, and statistical modeling. Work with real-world datasets.',
    topics: ['Data Analysis', 'Visualization', 'Machine Learning', 'Statistical Modeling', 'Pandas & NumPy'],
    prerequisites: ['Basic Python knowledge', 'Statistics fundamentals'],
    title: 'Data Science with Python',
    instructor: 'Maria Garcia',
    category: 'Data Science',
    rating: 4.8,
    students: 3201,
    duration: '10 weeks',
    price: 84.99,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23059669"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Data Science</text></svg>',
    saved: false,
  },
  {
    id: 6,
    description: 'Learn to design and implement cloud solutions using AWS. Master key services, architecture patterns, and best practices. Deploy scalable and secure applications.',
    topics: ['AWS Services', 'Cloud Architecture', 'Security', 'Scalability', 'DevOps'],
    prerequisites: ['Basic cloud computing knowledge', 'Linux fundamentals'],
    title: 'AWS Cloud Architecture',
    instructor: 'James Wilson',
    category: 'Cloud Computing',
    rating: 4.7,
    students: 1567,
    duration: '8 weeks',
    price: 79.99,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23F59E0B"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Cloud</text></svg>',
    saved: false,
  },
];

const Explore = () => {
  const [courseDetailsOpen, setCourseDetailsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [enrollmentFormOpen, setEnrollmentFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const filteredCourses = courses.filter((course) => {
    const searchMatch = !searchQuery || (
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.topics?.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    const categoryMatch = selectedCategory === 'All' || course.category === selectedCategory;
    return searchMatch && categoryMatch;
  });

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Explore Courses
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover new skills, expand your knowledge, and advance your career
        </Typography>
      </Box>

      {/* Search and Filter Section */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 3,
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
          {categories.map((category) => (
            <Tab key={category} label={category} value={category} />
          ))}
        </Tabs>
      </Box>

      {/* Courses Grid */}
      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={course.image}
                alt={course.title}
              />
              <Button
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  minWidth: 'auto',
                  p: 1,
                  bgcolor: 'background.paper',
                  borderRadius: '50%',
                  boxShadow: theme.shadows[2],
                  '&:hover': { bgcolor: 'background.paper' },
                }}
              >
                {course.saved ? (
                  <Bookmark color="primary" />
                ) : (
                  <BookmarkBorder />
                )}
              </Button>
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip
                  label={course.category}
                  size="small"
                  sx={{ mb: 2 }}
                  color="primary"
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { color: 'primary.main' },
                  }}
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  {course.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={`https://i.pravatar.cc/150?u=${course.instructor}`}
                    sx={{ width: 24, height: 24, mr: 1 }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
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
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating
                      value={course.rating}
                      readOnly
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2">{course.rating}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    <People sx={{ fontSize: 20, mr: 0.5 }} />
                    <Typography variant="body2">
                      {course.students.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 'auto',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ fontSize: 20, mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {course.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" color="primary.main">
                      ${course.price}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setSelectedCourse(course);
                        if (!isAuthenticated) {
                          sessionStorage.setItem('enrollCourseId', course.id);
                          navigate('/login');
                        } else {
                          setCourseDetailsOpen(true);
                        }
                      }}
                    >
                      {isAuthenticated ? 'Enroll Now' : 'View Course'}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Course Details Dialog */}
      <Dialog 
        open={courseDetailsOpen} 
        onClose={() => setCourseDetailsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedCourse?.title}</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Instructor:</strong> {selectedCourse?.instructor}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Category:</strong> {selectedCourse?.category}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Duration:</strong> {selectedCourse?.duration}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Price:</strong> ${selectedCourse?.price}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Rating:</strong> {selectedCourse?.rating} ({selectedCourse?.students.toLocaleString()} students)
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              <strong>Description:</strong>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {selectedCourse?.description}
              </Typography>
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              <strong>Topics Covered:</strong>
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedCourse?.topics.map((topic, index) => (
                  <Chip key={index} label={topic} size="small" />
                ))}
              </Box>
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              <strong>Prerequisites:</strong>
              <Box component="ul" sx={{ mt: 1, pl: 2 }}>
                {selectedCourse?.prerequisites.map((prereq, index) => (
                  <Typography key={index} component="li" variant="body2" color="text.secondary">
                    {prereq}
                  </Typography>
                ))}
              </Box>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCourseDetailsOpen(false)}>Close</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setCourseDetailsOpen(false);
              if (isAuthenticated) {
                setEnrollmentFormOpen(true);
              } else {
                sessionStorage.setItem('enrollCourseId', selectedCourse?.id);
                navigate('/login');
              }
            }}
          >
            {isAuthenticated ? 'Enroll Now' : 'Sign in to Enroll'}
          </Button>
        </DialogActions>
      </Dialog>
      <EnrollmentForm
        open={enrollmentFormOpen}
        onClose={() => {
          setEnrollmentFormOpen(false);
          setSelectedCourse(null);
        }}
        courseTitle={selectedCourse?.title}
      />
    </Box>
  );
};

export default Explore;