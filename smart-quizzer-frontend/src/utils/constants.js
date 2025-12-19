// API Constants
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

export const DIFFICULTY_COLORS = {
  easy: 'success',
  medium: 'primary',
  hard: 'danger',
};

// Question Types
export const QUESTION_TYPES = {
  MCQ: 'mcq',
  TRUE_FALSE: 'true_false',
  SHORT_ANSWER: 'short_answer',
};

// Content Types
export const CONTENT_TYPES = {
  PDF: 'pdf',
  URL: 'url',
  TEXT: 'text',
};

// Quiz Status
export const QUIZ_STATUS = {
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  ABANDONED: 'abandoned',
};

// Skill Levels
export const SKILL_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'smart_quizzer_access_token',
  REFRESH_TOKEN: 'smart_quizzer_refresh_token',
  USER: 'smart_quizzer_user',
  THEME: 'smart_quizzer_theme',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CONTENT_UPLOAD: '/content/upload',
  CONTENT_LIST: '/content',
  QUIZ_CONFIG: '/quiz/config',
  QUIZ_TAKE: '/quiz/:quizId',
  QUIZ_RESULTS: '/quiz/:quizId/results',
  ANALYTICS: '/analytics',
  PROFILE: '/profile',
};
