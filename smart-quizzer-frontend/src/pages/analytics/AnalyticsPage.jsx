import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Target, BookOpen } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import analyticsService from '../../services/analyticsService';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await analyticsService.getAnalyticsOverview();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage text="Loading analytics..." />;
  }

  const stats = [
    {
      label: 'Total Quizzes',
      value: analytics?.overview?.total_quizzes || 0,
      icon: BookOpen,
      color: 'primary',
    },
    {
      label: 'Overall Accuracy',
      value: `${analytics?.overview?.overall_accuracy || 0}%`,
      icon: Target,
      color: 'success',
    },
    {
      label: 'Average Score',
      value: `${analytics?.overview?.avg_score || 0}%`,
      icon: Award,
      color: 'secondary',
    },
    {
      label: 'Questions Answered',
      value: analytics?.overview?.total_questions_answered || 0,
      icon: TrendingUp,
      color: 'primary',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Track your learning progress and performance
        </p>

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
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        {analytics?.progress_chart && analytics.progress_chart.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Progress Chart */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                Progress Over Time
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.progress_chart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="accuracy" stroke="#0ea5e9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Topic Performance */}
            {analytics?.overview?.performance_by_topic && (
              <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                  Topic Performance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.overview.performance_by_topic}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="accuracy" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            )}
          </div>
        )}

        {/* Topics Mastered & To Improve */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Topics Mastered
            </h3>
            {analytics?.overview?.topics_mastered && analytics.overview.topics_mastered.length > 0 ? (
              <div className="space-y-2">
                {analytics.overview.topics_mastered.map((topic) => (
                  <div key={topic} className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-success-600" />
                    <span className="text-slate-700 dark:text-slate-300">{topic}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-600 dark:text-slate-400">
                Keep practicing to master topics!
              </p>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Topics to Improve
            </h3>
            {analytics?.overview?.topics_to_improve && analytics.overview.topics_to_improve.length > 0 ? (
              <div className="space-y-2">
                {analytics.overview.topics_to_improve.map((topic) => (
                  <div key={topic} className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-600" />
                    <span className="text-slate-700 dark:text-slate-300">{topic}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-600 dark:text-slate-400">
                Great job! No topics need improvement.
              </p>
            )}
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;
