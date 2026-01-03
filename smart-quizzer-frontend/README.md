# Smart Quizzer - Frontend

**Modern React-based Quiz Application with AI-Powered Learning**

A beautiful, responsive frontend for the Smart Quizzer adaptive quiz system, built with React, Vite, and Tailwind CSS v4.

---

## 🚀 Features

### User Experience
- **🎨 Modern UI/UX** - Glassmorphism design with smooth animations
- **🌓 Dark Mode** - Full dark mode support with toggle
- **📱 Fully Responsive** - Works on mobile, tablet, and desktop
- **⚡ Fast Performance** - Vite for lightning-fast HMR
- **🎭 Smooth Animations** - Framer Motion for delightful interactions

### Functionality
- **👤 User Authentication** - Register, login, JWT token management
- **📄 Content Management** - Upload PDF, URL, or text content
- **🧠 Quiz Taking** - Interactive quiz interface with real-time feedback
- **📊 Analytics Dashboard** - Performance tracking and progress visualization
- **🎯 Adaptive Learning** - Questions adapt to user performance

---

## 📋 Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Backend API**: Smart Quizzer backend running

---

## 🛠️ Installation

### 1. Navigate to Frontend Directory
```bash
cd smart-quizzer-v2/smart-quizzer-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create `.env` file in the frontend root:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

---

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

The app will be available at http://localhost:5173

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
smart-quizzer-frontend/
├── src/
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── layout/              # Layout components
│   │   │   └── Navbar.jsx
│   │   └── auth/                # Auth components
│   │       └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── auth/                # Authentication pages
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── content/             # Content management
│   │   │   ├── ContentUploadPage.jsx
│   │   │   └── ContentListPage.jsx
│   │   ├── quiz/                # Quiz pages
│   │   │   ├── QuizConfigPage.jsx
│   │   │   └── QuizPage.jsx
│   │   ├── analytics/           # Analytics
│   │   │   └── AnalyticsPage.jsx
│   │   └── DashboardPage.jsx    # Main dashboard
│   ├── services/                # API services
│   │   ├── api.js               # Axios instance
│   │   ├── authService.js
│   │   ├── contentService.js
│   │   ├── quizService.js
│   │   └── analyticsService.js
│   ├── contexts/                # React contexts
│   │   └── AuthContext.jsx
│   ├── hooks/                   # Custom hooks
│   │   └── useAuth.js
│   ├── utils/                   # Utilities
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── helpers.js
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── .env                         # Environment variables
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind config (v4)
└── package.json                 # Dependencies
```

---

## 🎨 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **Vite 7** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **React Router** | Client-side routing |
| **Axios** | HTTP client |
| **Framer Motion** | Animation library |
| **Recharts** | Chart visualization |
| **Lucide React** | Icon library |

---

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`#0ea5e9` → `#0284c7`)
- **Secondary**: Pink gradient (`#ec4899` → `#db2777`)
- **Success**: Green gradient (`#10b981` → `#059669`)
- **Danger**: Red gradient (`#ef4444` → `#dc2626`)

### Typography
- **Headings**: Outfit font family
- **Body**: Inter font family
- **Weights**: 300-800

### Components
- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first design approach

---

## 🔑 Key Features

### Authentication
- Email/password registration and login
- JWT token storage in localStorage
- Automatic token refresh on 401 errors
- Protected routes with redirect
- Google OAuth (optional)

### Content Management
- **PDF Upload**: Max 10MB, automatic text extraction
- **URL Fetching**: Web scraping for content
- **Text Upload**: Direct text input
- **Content List**: View and manage uploaded content

### Quiz System
- **Configuration**: Select content, difficulty, question count
- **Taking**: Interactive quiz interface
- **Real-time Feedback**: Immediate answer validation
- **Adaptive Difficulty**: Questions adjust based on performance
- **Progress Tracking**: Visual progress bar

### Analytics
- **Overview Stats**: Total quizzes, accuracy, average score
- **Progress Charts**: Performance over time (Recharts)
- **Topic Analysis**: Mastered topics and areas to improve

---

## 🎯 User Flow

1. **Register/Login** → Create account or sign in
2. **Upload Content** → Add study material (PDF/URL/Text)
3. **Configure Quiz** → Select content, difficulty, questions
4. **Take Quiz** → Answer questions with real-time feedback
5. **View Analytics** → Track progress and performance

---

## 🌓 Dark Mode

Dark mode is fully supported with:
- Toggle button in navbar
- Persistent preference (localStorage)
- Optimized colors for readability
- Smooth transitions

**Toggle Dark Mode**: Click moon/sun icon in navbar

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px (1 column layout)
- **Tablet**: 640px - 1024px (2 column layout)
- **Desktop**: > 1024px (3-4 column layout)

### Mobile Features
- Hamburger menu for navigation
- Touch-friendly buttons
- Optimized spacing
- Stacked layouts

---

## 🔧 Configuration

### Vite Config (`vite.config.js`)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### API Configuration (`src/services/api.js`)
- Base URL from environment variable
- Request interceptor for JWT tokens
- Response interceptor for token refresh
- Automatic 401 handling

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Vite will automatically try another port
# Or kill the process using port 5173
```

### API Connection Issues
```bash
# Check backend is running
curl http://localhost:8000/health

# Verify VITE_API_BASE_URL in .env
```

### Dark Mode Not Working
```bash
# Clear browser cache
# Hard refresh: Ctrl + Shift + R

# Clear localStorage
localStorage.clear()
```

### Styles Not Loading
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

---

## 🧪 Testing

### Manual Testing
1. Register new user
2. Upload content (PDF/URL/Text)
3. Generate quiz
4. Take quiz and verify feedback
5. Check analytics dashboard
6. Toggle dark mode
7. Test responsive design

### Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Output will be in `dist/` directory.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Environment Variables
Set these in your deployment platform:
- `VITE_API_BASE_URL` - Production API URL
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID

---

## 📊 Performance

### Optimization Features
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Optimized assets
- **CSS Purging**: Unused styles removed
- **Minification**: Production build minified

### Lighthouse Scores (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

---

## 🎨 Customization

### Change Colors
Edit `src/index.css`:
```css
:root {
  --gradient-primary: linear-gradient(135deg, #your-color 0%, #your-color 100%);
}
```

### Change Fonts
Edit `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont');
```

### Add New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `Navbar.jsx`

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🔐 Security

- **XSS Protection**: React's built-in escaping
- **CSRF**: JWT tokens (no cookies)
- **Secure Storage**: Tokens in localStorage
- **Input Validation**: Client-side validation
- **HTTPS**: Required for production

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

---

## 📞 Support

For issues and questions:
- Check browser console for errors
- Verify backend is running
- Clear cache and hard refresh
- Check environment variables

---

**Built with ❤️ using React, Vite, and Tailwind CSS v4**
