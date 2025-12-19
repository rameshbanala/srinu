# Smart Quizzer Frontend

A modern, AI-powered adaptive quiz generation platform built with React, Vite, and Tailwind CSS v4.

## Features

✨ **AI-Powered Quiz Generation** - Generate quizzes from PDFs, URLs, or text content using Groq LLM
🎯 **Adaptive Difficulty** - Questions adjust in real-time based on your performance
📊 **Analytics Dashboard** - Track your progress with detailed statistics and charts
🎨 **Modern UI** - Beautiful glassmorphism design with dark mode support
📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
⚡ **Fast & Efficient** - Built with Vite for lightning-fast development and builds

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8000`

## Installation

1. **Clone the repository**
   ```bash
   cd d:/srinu/smart-quizzer-v2/smart-quizzer-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, Input, etc.)
│   ├── layout/         # Layout components (Navbar, Sidebar)
│   ├── auth/           # Authentication components
│   ├── content/        # Content management components
│   ├── quiz/           # Quiz-related components
│   └── analytics/      # Analytics components
├── pages/              # Page components
│   ├── auth/           # Login, Register
│   ├── content/        # Content upload, list
│   ├── quiz/           # Quiz config, taking, results
│   └── analytics/      # Analytics dashboard
├── services/           # API service modules
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── App.jsx             # Main app component
```

## Usage Guide

### 1. Register/Login
- Create an account or login with existing credentials
- Choose your skill level (Beginner, Intermediate, Advanced)

### 2. Upload Content
- Navigate to **Content** → **Upload Content**
- Choose from three options:
  - **PDF Upload**: Upload study materials in PDF format (max 10MB)
  - **URL**: Fetch content from any web page
  - **Text**: Paste or type content directly

### 3. Generate Quiz
- Go to **Quiz** → **Configure Quiz**
- Select your uploaded content
- Choose difficulty level and number of questions
- Click **Generate Quiz**

### 4. Take Quiz
- Answer questions one by one
- Get instant feedback on each answer
- Experience adaptive difficulty adjustment

### 5. View Analytics
- Check your **Analytics** dashboard
- View progress charts and topic performance
- Identify topics mastered and areas to improve

## API Integration

The frontend communicates with the backend API at `http://localhost:8000/api/v1`

### Key Endpoints:
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /content/upload/pdf` - Upload PDF
- `POST /content/upload/url` - Fetch URL content
- `POST /content/upload/text` - Upload text
- `POST /quiz/generate` - Generate quiz
- `POST /quiz/{id}/submit` - Submit answer
- `GET /analytics/overview` - Get analytics

## Features in Detail

### Glassmorphism Design
- Frosted glass effect cards
- Backdrop blur
- Subtle shadows and borders
- Smooth hover transitions

### Dark Mode
- Toggle between light and dark themes
- Persistent theme preference
- Optimized color schemes for both modes

### Adaptive Quiz Engine
- Questions adjust difficulty based on performance
- Real-time feedback with explanations
- Progress tracking throughout the quiz

### Analytics Dashboard
- Overall accuracy and average score
- Progress over time (line chart)
- Topic-wise performance (bar chart)
- Topics mastered vs. topics to improve

## Troubleshooting

### Backend Connection Issues
- Ensure the backend is running on `http://localhost:8000`
- Check CORS settings in backend allow `http://localhost:5173`
- Verify `.env` file has correct `VITE_API_BASE_URL`

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is part of the Smart Quizzer platform.

## Support

For issues or questions, please contact the development team.
