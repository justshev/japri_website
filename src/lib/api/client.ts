import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach auth token
apiClient.interceptors.request.use((config) => {
  const session = localStorage.getItem("fungifarm_session");
  if (session) {
    try {
      const { accessToken } = JSON.parse(session);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch {
      // Invalid session data
    }
  }
  return config;
});

// Response interceptor: handle token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/")
    ) {
      originalRequest._retry = true;

      try {
        const session = localStorage.getItem("fungifarm_session");
        if (session) {
          const { refreshToken } = JSON.parse(session);
          if (refreshToken) {
            const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refreshToken,
            });

            if (data.success) {
              const newSession = {
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
                expiresAt: data.data.expiresAt,
              };
              localStorage.setItem(
                "fungifarm_session",
                JSON.stringify(newSession),
              );
              originalRequest.headers.Authorization = `Bearer ${newSession.accessToken}`;
              return apiClient(originalRequest);
            }
          }
        }
      } catch {
        // Refresh failed — clear session
        localStorage.removeItem("fungifarm_session");
        localStorage.removeItem("fungifarm_user");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
