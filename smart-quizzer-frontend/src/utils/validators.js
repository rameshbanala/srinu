// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Username validation
export const isValidUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

// Form field validation
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case 'email':
      return isValidEmail(value) ? null : 'Please enter a valid email address';
    
    case 'username':
      return isValidUsername(value) 
        ? null 
        : 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
    
    case 'password':
      const passwordValidation = validatePassword(value);
      return passwordValidation.isValid ? null : passwordValidation.errors.join(', ');
    
    case 'required':
      return value && value.trim() !== '' ? null : 'This field is required';
    
    default:
      return null;
  }
};
