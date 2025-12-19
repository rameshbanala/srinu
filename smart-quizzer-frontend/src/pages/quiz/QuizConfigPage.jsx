import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Settings, Play } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import contentService from '../../services/contentService';
import quizService from '../../services/quizService';
import { DIFFICULTY_LEVELS, QUESTION_TYPES } from '../../utils/constants';

const QuizConfigPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const [config, setConfig] = useState({
    content_id: location.state?.contentId || '',
    num_questions: 10,
    difficulty: DIFFICULTY_LEVELS.MEDIUM,
    question_types: [QUESTION_TYPES.MCQ, QUESTION_TYPES.TRUE_FALSE],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const data = await contentService.getContentList();
      setContent(data);
      if (data.length > 0 && !config.content_id) {
        setConfig(prev => ({ ...prev, content_id: data[0].id }));
      }
    } catch (err) {
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!config.content_id) {
      setError('Please select content');
      return;
    }

    setGenerating(true);
    setError('');

    try {
      const quiz = await quizService.generateQuiz(config);
      navigate(`/quiz/${quiz.id}`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate quiz');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage text="Loading..." />;
  }

  if (content.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-12 text-center">
          <Brain className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
            No content available
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Please upload some content first to generate quizzes
          </p>
          <Button variant="primary" onClick={() => navigate('/content/upload')}>
            Upload Content
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Settings className="w-8 h-8 text-primary-600" />
          <h1 className="text-4xl font-bold gradient-text">
            Configure Quiz
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Customize your quiz settings
        </p>

        <Card className="p-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800">
              <p className="text-danger-700 dark:text-danger-400">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Content Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Select Content <span className="text-danger-500">*</span>
              </label>
              <select
                value={config.content_id}
                onChange={(e) => setConfig({ ...config, content_id: parseInt(e.target.value) })}
                className="input"
              >
                {content.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title} ({item.content_type})
                  </option>
                ))}
              </select>
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Number of Questions: {config.num_questions}
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={config.num_questions}
                onChange={(e) => setConfig({ ...config, num_questions: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>5</span>
                <span>50</span>
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {Object.values(DIFFICULTY_LEVELS).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setConfig({ ...config, difficulty: level })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      config.difficulty === level
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                        : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'
                    }`}
                  >
                    <span className={`font-semibold capitalize ${
                      config.difficulty === level
                        ? 'text-primary-700 dark:text-primary-300'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {level}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={handleGenerate}
              loading={generating}
              icon={Play}
            >
              Generate Quiz
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default QuizConfigPage;
