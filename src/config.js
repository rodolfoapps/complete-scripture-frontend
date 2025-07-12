// Configuration for API endpoints
const config = {
  development: {
    apiBaseUrl: '/api/scripture'
  },
  production: {
    apiBaseUrl: 'https://scripture-search-backend.vercel.app/api/scripture'
  }
}

// Get current environment
const isDevelopment = import.meta.env.DEV

// Export the appropriate configuration
export const API_BASE_URL = isDevelopment 
  ? config.development.apiBaseUrl 
  : config.production.apiBaseUrl 