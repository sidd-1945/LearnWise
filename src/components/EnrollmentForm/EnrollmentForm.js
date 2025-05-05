import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';

const EnrollmentForm = ({ open, onClose, courseTitle }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    contactNumber: '',
    whatsappNumber: '',
    paymentMode: 'creditCard',
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
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" gutterBottom>
          Enroll in {courseTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please fill in your details to enroll in this course
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="contactNumber"
              label="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="whatsappNumber"
              label="WhatsApp Number"
              value={formData.whatsappNumber}
              onChange={handleChange}
              required
              fullWidth
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Mode of Payment</FormLabel>
              <RadioGroup
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="creditCard"
                  control={<Radio />}
                  label="Credit Card"
                />
                <FormControlLabel
                  value="debitCard"
                  control={<Radio />}
                  label="Debit Card"
                />
                <FormControlLabel
                  value="netBanking"
                  control={<Radio />}
                  label="Net Banking"
                />
                <FormControlLabel
                  value="upi"
                  control={<Radio />}
                  label="UPI"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Enroll Now
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EnrollmentForm;