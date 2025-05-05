import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Chip,
  Drawer,
  useTheme,
  Divider,
} from '@mui/material';
import {
  Send,
  SmartToy,
  Close,
  Psychology,
  School,
  MenuBook,
} from '@mui/icons-material';

const suggestions = [
  'Help me understand this topic',
  'Create a study plan',
  'Explain difficult concepts',
  'Practice exercises',
  'Summarize the lesson',
];

const initialMessages = [
  {
    type: 'assistant',
    content: 'Hi! I\'m your AI learning assistant. I can help you understand concepts, create study plans, and answer your questions. How can I help you today?',
  },
];

const AIAssistant = ({ open, onClose }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const theme = useTheme();

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { type: 'user', content: input },
    ];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          type: 'assistant',
          content: 'I understand you need help with that. Let me analyze your question and provide a detailed explanation that will help you understand better.',
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          bgcolor: 'background.default',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                mr: 1,
              }}
            >
              <SmartToy />
            </Avatar>
            <Typography variant="h6">AI Assistant</Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>

        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {message.type === 'assistant' && (
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 32,
                    height: 32,
                    mr: 1,
                  }}
                >
                  <SmartToy sx={{ fontSize: 20 }} />
                </Avatar>
              )}
              <Paper
                sx={{
                  p: 2,
                  maxWidth: '75%',
                  bgcolor:
                    message.type === 'user'
                      ? 'primary.main'
                      : 'background.paper',
                  color:
                    message.type === 'user'
                      ? 'primary.contrastText'
                      : 'text.primary',
                }}
              >
                <Typography variant="body1">{message.content}</Typography>
              </Paper>
            </Box>
          ))}
          {isTyping && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 32,
                  height: 32,
                }}
              >
                <SmartToy sx={{ fontSize: 20 }} />
              </Avatar>
              <Typography variant="body2" color="text.secondary">
                AI is typing...
              </Typography>
            </Box>
          )}
        </Box>

        {/* Suggestions */}
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Suggested Questions:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {suggestions.map((suggestion, index) => (
              <Chip
                key={index}
                label={suggestion}
                onClick={() => setInput(suggestion)}
                size="small"
              />
            ))}
          </Box>
        </Box>

        {/* Input */}
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: 'background.paper',
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={handleSend}
                  disabled={!input.trim()}
                  color="primary"
                >
                  <Send />
                </IconButton>
              ),
            }}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default AIAssistant;