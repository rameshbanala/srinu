import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Globe, Type, Upload, Loader2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import contentService from '../../services/contentService';

const ContentUploadPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pdf');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // PDF Upload State
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfTitle, setPdfTitle] = useState('');

  // URL Upload State
  const [url, setUrl] = useState('');
  const [urlTitle, setUrlTitle] = useState('');

  // Text Upload State
  const [text, setText] = useState('');
  const [textTitle, setTextTitle] = useState('');

  const handlePDFUpload = async (e) => {
    e.preventDefault();
    if (!pdfFile) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await contentService.uploadPDF(pdfFile, pdfTitle || pdfFile.name);
      setSuccess('PDF uploaded successfully!');
      setTimeout(() => navigate('/content'), 1500);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to upload PDF');
    } finally {
      setLoading(false);
    }
  };

  const handleURLUpload = async (e) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await contentService.uploadURL(url, urlTitle || 'Web Content');
      setSuccess('URL content uploaded successfully!');
      setTimeout(() => navigate('/content'), 1500);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch URL content');
    } finally {
      setLoading(false);
    }
  };

  const handleTextUpload = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await contentService.uploadText(text, textTitle || 'Text Content');
      setSuccess('Text uploaded successfully!');
      setTimeout(() => navigate('/content'), 1500);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to upload text');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'pdf', label: 'PDF Upload', icon: FileText },
    { id: 'url', label: 'URL', icon: Globe },
    { id: 'text', label: 'Text', icon: Type },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">
          Upload Content
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Add study material to generate quizzes from
        </p>

        <Card className="p-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setError('');
                  setSuccess('');
                }}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-4 p-4 rounded-xl bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800">
              <p className="text-danger-700 dark:text-danger-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 rounded-xl bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800">
              <p className="text-success-700 dark:text-success-400">{success}</p>
            </div>
          )}

          {/* PDF Upload */}
          {activeTab === 'pdf' && (
            <form onSubmit={handlePDFUpload} className="space-y-6">
              <Input
                label="Title (Optional)"
                type="text"
                value={pdfTitle}
                onChange={(e) => setPdfTitle(e.target.value)}
                placeholder="Enter a title for this content"
              />

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  PDF File <span className="text-danger-500">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:border-primary-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setPdfFile(e.target.files[0])}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="cursor-pointer flex flex-col items-center gap-3"
                  >
                    <Upload className="w-12 h-12 text-slate-400" />
                    <div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium">
                        {pdfFile ? pdfFile.name : 'Click to upload PDF'}
                      </p>
                      <p className="text-sm text-slate-500">Max file size: 10MB</p>
                    </div>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={loading}
                icon={Upload}
              >
                Upload PDF
              </Button>
            </form>
          )}

          {/* URL Upload */}
          {activeTab === 'url' && (
            <form onSubmit={handleURLUpload} className="space-y-6">
              <Input
                label="Title (Optional)"
                type="text"
                value={urlTitle}
                onChange={(e) => setUrlTitle(e.target.value)}
                placeholder="Enter a title for this content"
              />

              <Input
                label="URL"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                icon={Globe}
                required
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={loading}
                icon={Upload}
              >
                Fetch Content
              </Button>
            </form>
          )}

          {/* Text Upload */}
          {activeTab === 'text' && (
            <form onSubmit={handleTextUpload} className="space-y-6">
              <Input
                label="Title"
                type="text"
                value={textTitle}
                onChange={(e) => setTextTitle(e.target.value)}
                placeholder="Enter a title for this content"
                required
              />

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Text Content <span className="text-danger-500">*</span>
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste or type your content here..."
                  rows={12}
                  className="input resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={loading}
                icon={Upload}
              >
                Upload Text
              </Button>
            </form>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ContentUploadPage;
