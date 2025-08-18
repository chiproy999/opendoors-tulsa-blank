// XSS Prevention and Input Sanitization
const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

export const sanitizeHtml = (str: string): string => {
  return str.replace(/[&<>"'/]/g, (char) => HTML_ENTITIES[char] || char);
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/\s+/g, ' ') // Normalize whitespace
    .slice(0, 1000); // Limit length
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateLength = (value: string, min: number, max: number, fieldName: string): string | null => {
  const trimmed = value.trim();
  if (trimmed.length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  if (trimmed.length > max) {
    return `${fieldName} must be no more than ${max} characters`;
  }
  return null;
};

export const sanitizeAndValidateContactForm = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiry_type: string;
}) => {
  const errors: Record<string, string> = {};
  const sanitized = {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email.toLowerCase()),
    subject: sanitizeInput(data.subject),
    message: sanitizeInput(data.message),
    inquiry_type: sanitizeInput(data.inquiry_type),
  };

  // Validation
  const nameError = validateRequired(sanitized.name, 'Name') || validateLength(sanitized.name, 2, 50, 'Name');
  if (nameError) errors.name = nameError;

  if (!validateEmail(sanitized.email)) {
    errors.email = 'Please enter a valid email address';
  }

  const subjectError = validateRequired(sanitized.subject, 'Subject') || validateLength(sanitized.subject, 5, 100, 'Subject');
  if (subjectError) errors.subject = subjectError;

  const messageError = validateRequired(sanitized.message, 'Message') || validateLength(sanitized.message, 10, 1000, 'Message');
  if (messageError) errors.message = messageError;

  const validInquiryTypes = ['general', 'job', 'housing', 'support'];
  if (!validInquiryTypes.includes(sanitized.inquiry_type)) {
    errors.inquiry_type = 'Invalid inquiry type';
  }

  return { sanitized, errors, isValid: Object.keys(errors).length === 0 };
};