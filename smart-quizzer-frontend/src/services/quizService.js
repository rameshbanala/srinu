import api from './api';

const quizService = {
  // Generate new quiz
  async generateQuiz(config) {
    const response = await api.post('/quiz/generate', config);
    return response.data;
  },

  // Get quiz by ID
  async getQuiz(quizId) {
    const response = await api.get(`/quiz/${quizId}`);
    return response.data;
  },

  // Submit answer for a question
  async submitAnswer(quizId, answerData) {
    const response = await api.post(`/quiz/${quizId}/submit-answer`, answerData);
    return response.data;
  },

  // Complete quiz and get results
  async completeQuiz(quizId) {
    const response = await api.post(`/quiz/${quizId}/complete`);
    return response.data;
  },

  // Get quiz history
  async getQuizHistory(skip = 0, limit = 20) {
    const response = await api.get('/quiz/history', {
      params: { skip, limit },
    });
    return response.data;
  },
};

export default quizService;
