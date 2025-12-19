import api from './api';

const analyticsService = {
  // Get analytics overview
  async getAnalyticsOverview() {
    const response = await api.get('/analytics/overview');
    return response.data;
  },
};

export default analyticsService;
