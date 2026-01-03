import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, Trophy } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import quizService from '../../services/quizService';

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const data = await quizService.getQuiz(quizId);
      setQuiz(data);
      setError('');
    } catch (err) {
      console.error('Error fetching quiz:', err);
      setError('Failed to load quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !quiz) return;

    setSubmitting(true);
    try {
      const result = await quizService.submitAnswer(quizId, {
        question_id: quiz.questions[currentQuestionIndex].id,
        user_answer: selectedAnswer,
        time_taken_seconds: 0, // You can add timer functionality later
      });
      
      setFeedback(result);
      
      // Auto-advance after showing feedback
      setTimeout(() => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer('');
          setFeedback(null);
        } else {
          handleCompleteQuiz();
        }
      }, 3000);
    } catch (error) {
      console.error('Error submitting answer:', error);
      setError('Failed to submit answer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompleteQuiz = async () => {
    try {
      const results = await quizService.completeQuiz(quizId);
      // Navigate to analytics or show results
      navigate('/analytics');
    } catch (error) {
      console.error('Error completing quiz:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage text="Loading quiz..." />;
  }

  if (error && !quiz) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="p-8 text-center">
          <XCircle className="w-16 h-16 text-danger-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-black mb-2">
            Error Loading Quiz
          </h2>
          <p className="text-slate-700 dark:text-slate-800 mb-6">{error}</p>
          <Button variant="primary" onClick={() => navigate('/quiz/config')}>
            Back to Quiz Config
          </Button>
        </Card>
      </div>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-black mb-2">
            No Questions Available
          </h2>
          <p className="text-slate-700 dark:text-slate-800 mb-6">
            This quiz doesn't have any questions yet.
          </p>
          <Button variant="primary" onClick={() => navigate('/quiz/config')}>
            Generate New Quiz
          </Button>
        </Card>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8">
            {/* Question */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className={`badge badge-${
                  currentQuestion.difficulty === 'easy' ? 'success' :
                  currentQuestion.difficulty === 'medium' ? 'primary' : 'danger'
                }`}>
                  {currentQuestion.difficulty}
                </span>
                <span className="badge badge-secondary">
                  {currentQuestion.question_type === 'mcq' ? 'Multiple Choice' : 'True/False'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-black">
                {currentQuestion.question_text}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options && currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !feedback && setSelectedAnswer(option)}
                  disabled={!!feedback}
                  className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                    selectedAnswer === option
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-100 shadow-md'
                      : 'border-slate-300 dark:border-slate-500 hover:border-primary-400 hover:bg-slate-100 dark:hover:bg-slate-200'
                  } ${feedback ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
                >
                  <span className={`font-semibold ${
                    selectedAnswer === option
                      ? 'text-primary-900 dark:text-primary-900'
                      : 'text-slate-900 dark:text-slate-900'
                  }`}>
                    {option}
                  </span>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl mb-6 ${
                  feedback.is_correct
                    ? 'bg-success-100 dark:bg-success-900/30 border-2 border-success-300 dark:border-success-700'
                    : 'bg-danger-100 dark:bg-danger-900/30 border-2 border-danger-300 dark:border-danger-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {feedback.is_correct ? (
                    <CheckCircle className="w-6 h-6 text-success-700 dark:text-success-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-danger-700 dark:text-danger-400" />
                  )}
                  <span className={`font-bold text-lg ${
                    feedback.is_correct 
                      ? 'text-success-800 dark:text-success-300' 
                      : 'text-danger-800 dark:text-danger-300'
                  }`}>
                    {feedback.is_correct ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                {!feedback.is_correct && (
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-500 mb-1">
                    Correct answer: <strong className="text-success-700 dark:text-success-400">{feedback.correct_answer}</strong>
                  </p>
                )}
                {feedback.explanation && (
                  <p className="text-sm text-slate-800 dark:text-slate-800 mt-2 bg-white/50 dark:bg-slate-800/50 p-3 rounded-lg">
                    💡 {feedback.explanation}
                  </p>
                )}
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 rounded-xl bg-danger-100 dark:bg-danger-900/30 border border-danger-300 dark:border-danger-700">
                <p className="text-danger-800 dark:text-danger-300 font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            {!feedback && (
              <Button
                variant="primary"
                className="w-full"
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                loading={submitting}
                icon={ArrowRight}
              >
                Submit Answer
              </Button>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizPage;
