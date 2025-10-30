// API Configuration
// Change these URLs based on your environment

export const API_CONFIG = {
  // HTTP API Base URL
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002',
  
  // WebSocket URL
  WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080',
};

// API Endpoints
export const API_ENDPOINTS = {
  REGISTER_TEAM: `${API_CONFIG.BASE_URL}/register-team`,
  LOGIN_TEAM: `${API_CONFIG.BASE_URL}/login-team`,
  TEAM_LOCKED: `${API_CONFIG.BASE_URL}/team-locked`,
  UNSOLVED_QUESTIONS: `${API_CONFIG.BASE_URL}/unsolved-questions`,
  GET_HINTS: `${API_CONFIG.BASE_URL}/get-hints`,
  SUBMIT_ANSWER: `${API_CONFIG.BASE_URL}/submit-answer`,
  GET_QUESTIONS: `${API_CONFIG.BASE_URL}/get-questions`,
  GET_TEAMS: `${API_CONFIG.BASE_URL}/get-teams`,
};
