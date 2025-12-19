import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Globe, Type, Trash2, Brain, Plus } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import contentService from '../../services/contentService';
import { formatDate } from '../../utils/helpers';

const ContentListPage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const data = await contentService.getContentList();
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this content?')) {
      return;
    }

    setDeleting(id);
    try {
      await contentService.deleteContent(id);
      setContent(content.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Failed to delete content');
    } finally {
      setDeleting(null);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'pdf':
        return FileText;
      case 'url':
        return Globe;
      case 'text':
        return Type;
      default:
        return FileText;
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage text="Loading content..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            My Content
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your study materials
          </p>
        </div>
        <Link to="/content/upload">
          <Button variant="primary" icon={Plus}>
            Upload Content
          </Button>
        </Link>
      </div>

      {content.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
            No content yet
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Upload your first study material to get started
          </p>
          <Link to="/content/upload">
            <Button variant="primary" icon={Plus}>
              Upload Content
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, index) => {
            const Icon = getIcon(item.content_type);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <span className="badge badge-primary text-xs">
                      {item.content_type.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {item.word_count} words • {formatDate(item.created_at)}
                  </p>

                  <div className="mt-auto flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      icon={Brain}
                      onClick={() => navigate('/quiz/config', { state: { contentId: item.id } })}
                    >
                      Create Quiz
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      loading={deleting === item.id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContentListPage;
