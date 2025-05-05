import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const quizQuestions = [
  {
    question: 'What is the correct way to declare a variable in JavaScript?',
    options: [
      'var myVar = 10;',
      'variable myVar = 10;',
      'v myVar = 10;',
      'let myVar: 10;',
    ],
    correctAnswer: 0,
  },
  {
    question: 'Which of the following is NOT a JavaScript data type?',
    options: ['String', 'Boolean', 'Float', 'Symbol'],
    correctAnswer: 2,
  },
  {
    question: 'What does DOM stand for in web development?',
    options: [
      'Document Object Model',
      'Data Object Management',
      'Digital Ordinance Model',
      'Document Oriented Markup',
    ],
    correctAnswer: 0,
  },
  {
    question: 'Which method is used to add an element at the end of an array in JavaScript?',
    options: ['push()', 'append()', 'addToEnd()', 'insert()'],
    correctAnswer: 0,
  },
  {
    question: 'What is the purpose of the "use strict" directive in JavaScript?',
    options: [
      'To enforce stricter parsing and error handling',
      'To make the code run faster',
      'To enable new JavaScript features',
      'To prevent code execution in older browsers',
    ],
    correctAnswer: 0,
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(null));

  const handleAnswerChange = (questionIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }

    // Calculate score and show results
    const score = answers.reduce((total, answer, index) => {
      return answer === quizQuestions[index].correctAnswer ? total + 1 : total;
    }, 0);

    console.log(`Score: ${score}/${quizQuestions.length}`);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Coding Quiz
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Test your coding knowledge with these multiple-choice questions.
      </Typography>

      {quizQuestions.map((question, index) => (
        <Card key={index} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Question {index + 1}
            </Typography>
            <Typography variant="body1" paragraph>
              {question.question}
            </Typography>

            <RadioGroup
              value={answers[index] === null ? '' : answers[index].toString()}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            >
              {question.options.map((option, optionIndex) => (
                <FormControlLabel
                  key={optionIndex}
                  value={optionIndex.toString()}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 4 }} />

      <Box sx={{ textAlign: 'center' }}>
        {!isAuthenticated ? (
          <>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Sign up to see your results!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={answers.includes(null)}
          >
            Submit Quiz
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Quiz;