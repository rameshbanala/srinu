import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  FileText, 
  TrendingUp, 
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import analyticsService from '../services/analyticsService';
import contentService from '../services/contentService';

const DashboardPage = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [recentContent, setRecentContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsData, contentData] = await Promise.all([
          analyticsService.getAnalyticsOverview(),
          contentService.getContentList(0, 5),
        ]);
        setAnalytics(analyticsData);
        setRecentContent(contentData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner fullPage text="Loading dashboard..." />;
  }

  const stats = [
    {
      label: 'Total Quizzes',
      value: analytics?.overview?.total_quizzes || 0,
      icon: Brain,
      color: 'primary',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      label: 'Overall Accuracy',
      value: `${analytics?.overview?.overall_accuracy || 0}%`,
      icon: TrendingUp,
      color: 'success',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      label: 'Avg Score',
      value: `${analytics?.overview?.avg_score || 0}%`,
      icon: Award,
      color: 'secondary',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      label: 'Content Items',
      value: recentContent.length,
      icon: FileText,
      color: 'primary',
      gradient: 'from-cyan-500 to-blue-600',
    },
  ];

  const quickActions = [
    {
      title: 'Upload Content',
      description: 'Add new study material',
      icon: FileText,
      link: '/content/upload',
      color: 'primary',
    },
    {
      title: 'Take Quiz',
      description: 'Start a new quiz session',
      icon: Brain,
      link: '/quiz/config',
      color: 'secondary',
    },
    {
      title: 'View Analytics',
      description: 'Check your progress',
      icon: TrendingUp,
      link: '/analytics',
      color: 'success',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          <h1 className="text-4xl font-bold gradient-text">
            Welcome back, {user?.username}!
          </h1>
        </div>
        <p className="text-slate-800 dark:text-slate-900 text-lg font-medium">
          Ready to continue your learning journey?
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-500 mb-1">
                {stat.value}
              </h3>
              <p className="text-slate-700 dark:text-slate-800 text-sm font-semibold">
                {stat.label}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-black mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link to={action.link}>
                <Card hover className="p-6 h-full">
                  <action.icon className={`w-12 h-12 text-${action.color}-600 mb-4`} />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-black mb-2">
                    {action.title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-800 mb-4 font-medium">
                    {action.description}
                  </p>
                  <div className="flex items-center text-primary-600 font-semibold">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {analytics?.overview?.total_quizzes > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-black">
              Recent Activity
            </h2>
            <Link
              to="/analytics"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <Card className="p-6">
            {analytics.recent_quizzes && analytics.recent_quizzes.length > 0 ? (
              <div className="space-y-4">
                {analytics.recent_quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-black">
                        {quiz.topic || 'General Quiz'}
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-600">
                        {new Date(quiz.completed_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        {quiz.score}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-slate-600 dark:text-slate-800 py-8">
                No recent quizzes. Start your first quiz!
              </p>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
