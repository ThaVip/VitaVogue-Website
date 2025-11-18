import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import axios from '../../lib/axios';

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ name, email, phone, password, confirmPassword }) => {
        set({ loading: true });

        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Passwords do not match");
        }

        try {
            const res = await axios.post("/auth/signup", { name, email, phone, password });
            
            // ✅ Store user and tokens
            const userData = res.data.user;
            const { accessToken, refreshToken } = res.data;
            
            set({ user: userData, loading: false });
            
            // ✅ Store tokens in localStorage
            if (accessToken) localStorage.setItem('accessToken', accessToken);
            if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
            
            toast.success("Account created successfully!");
            return { success: true };
        } catch (error) {
            set({ loading: false });
            if (error.response) {
                toast.error(error.response.data.message || `Error ${error.response.status}`);
            } else if (error.request) {
                toast.error("Cannot connect to server. Please check your connection.");
            } else {
                toast.error("An error occurred: " + error.message);
            }
            return { success: false };
        }
    },

    login: async ({ email, password }) => {
        set({ loading: true });

        try {
            const res = await axios.post("/auth/login", { email, password });
            
            // ✅ Store user and tokens
            const userData = res.data.user;
            const { accessToken, refreshToken } = res.data;
            
            set({ user: userData, loading: false });
            
            // ✅ Store tokens in localStorage
            if (accessToken) localStorage.setItem('accessToken', accessToken);
            if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
            
            toast.success("Welcome back!");
            return { success: true };
        } catch (error) {
            set({ loading: false });
            if (error.response) {
                toast.error(error.response.data.message || `Error ${error.response.status}`);
            } else if (error.request) {
                toast.error("Cannot connect to server. Please check your connection.");
            } else {
                toast.error("An error occurred: " + error.message);
            }
            return { success: false };
        }
    },

    logout: async () => {
        try {
            await axios.post("/auth/logout");
            set({ user: null });
            
            // ✅ Clear tokens from localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            
            toast.success("Logged out successfully");
        } catch (error) {
            // ✅ Clear tokens even if request fails
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            set({ user: null });
            toast.error(error.response?.data?.message || "An error occurred during logout");
        }
    },

    checkAuth: async () => {
        set({ checkingAuth: true });
        
        // ✅ Check if token exists first
        const token = localStorage.getItem('accessToken');
        if (!token) {
            set({ checkingAuth: false, user: null });
            return;
        }
        
        try {
            const response = await axios.get("/auth/profile");
            set({ user: response.data, checkingAuth: false });
        } catch (error) {
            // ✅ Try to refresh token
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    await get().refreshToken();
                } catch (refreshError) {
                    set({ checkingAuth: false, user: null });
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }
            } else {
                set({ checkingAuth: false, user: null });
            }
        }
    },

    refreshToken: async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
            set({ user: null });
            return;
        }
        
        try {
            const response = await axios.post("/auth/refresh-token", { refreshToken });
            const { accessToken } = response.data;
            
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                await get().checkAuth();
            }
        } catch (error) {
            set({ user: null });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            console.log("Token refresh failed:", error.message);
        }
    }
}));