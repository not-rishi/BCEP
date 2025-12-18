// API configuration for the whole frontend
window.API_BASE_URL = "[api-link-here(no '/' at the end)]";
window.apiFetch = (endpoint, options = {}) => {
  options.headers = options.headers || {};

  // options.headers["ngrok-skip-browser-warning"] = "true"; if using ngrok tunneling to host the backend API

  const fullUrl = `${window.API_BASE_URL}${endpoint}`;

  return fetch(fullUrl, options);
};




