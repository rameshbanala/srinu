import api from './api';

const contentService = {
  // Upload PDF file
  async uploadPDF(file, title) {
    const formData = new FormData();
    formData.append('file', file);
    if (title) {
      formData.append('title', title);
    }

    const response = await api.post('/content/upload/pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Upload URL
  async uploadURL(url, title) {
    const response = await api.post('/content/upload/url', { url, title });
    return response.data;
  },

  // Upload text
  async uploadText(text, title) {
    const response = await api.post('/content/upload/text', { text, title });
    return response.data;
  },

  // Get all user content
  async getContentList(skip = 0, limit = 20) {
    const response = await api.get('/content', {
      params: { skip, limit },
    });
    return response.data;
  },

  // Get specific content by ID
  async getContent(contentId) {
    const response = await api.get(`/content/${contentId}`);
    return response.data;
  },

  // Delete content
  async deleteContent(contentId) {
    await api.delete(`/content/${contentId}`);
  },
};

export default contentService;
