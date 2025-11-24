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
            
            // 🔍 DEBUG: Log the entire response
            console.log("🔍 SIGNUP RESPONSE:", res.data);
            console.log("🔍 FULL RESPONSE OBJECT:", res);
            
            // ✅ Store tokens in localStorage for mobile compatibility
            if (res.data.accessToken) {
                console.log("✅ Storing accessToken:", res.data.accessToken.substring(0, 20) + "...");
                localStorage.setItem('accessToken', res.data.accessToken);
            } else {
                console.log("❌ No accessToken in response");
            }
            
            if (res.data.refreshToken) {
                console.log("✅ Storing refreshToken");
                localStorage.setItem('refreshToken', res.data.refreshToken);
            } else {
                console.log("❌ No refreshToken in response");
            }
            
            set({ user: res.data.user, loading: false });
            toast.success("Account created successfully!");
            return { success: true };
        } catch (error) {
            set({ loading: false });
            if (error.response) {
                console.error("Response error:", error.response);
                toast.error(error.response.data.message || `Error ${error.response.status}: ${error.response.statusText}`);
            } else if (error.request) {
                toast.error("Cannot connect to server. Please check your connection.");
            } else {
                toast.error("An error occurred: " + error.message);
            }
            console.error("Signup error:", error);
            return { success: false };
        }
    },

    login: async ({ email, password }) => {
        set({ loading: true });

        try {
            const res = await axios.post("/auth/login", { email, password });
            
            // 🔍 DEBUG: Log the entire response
            console.log("🔍 LOGIN RESPONSE:", res.data);
            console.log("🔍 RESPONSE HEADERS:", res.headers);
            console.log("🔍 COOKIES:", document.cookie);
            
            // ✅ Store tokens in localStorage for mobile compatibility
            if (res.data.accessToken) {
                console.log("✅ Storing accessToken:", res.data.accessToken.substring(0, 20) + "...");
                localStorage.setItem('accessToken', res.data.accessToken);
            } else {
                console.log("❌ No accessToken in response.data");
            }
            
            if (res.data.refreshToken) {
                console.log("✅ Storing refreshToken");
                localStorage.setItem('refreshToken', res.data.refreshToken);
            } else {
                console.log("❌ No refreshToken in response.data");
            }
            
            // 🔍 Verify storage
            console.log("🔍 LocalStorage accessToken:", localStorage.getItem('accessToken')?.substring(0, 20) + "...");
            
            set({ user: res.data.user || res.data, loading: false });
            toast.success("Welcome back!");
            return { success: true };
        } catch (error) {
            set({ loading: false });
            if (error.response) {
                console.error("Response error:", error.response);
                toast.error(error.response.data.message || `Error ${error.response.status}: ${error.response.statusText}`);
            } else if (error.request) {
                toast.error("Cannot connect to server. Please check your connection.");
            } else {
                toast.error("An error occurred: " + error.message);
            }
            console.error("Login error:", error);
            return { success: false };
        }
    },

    logout: async () => {
        try {
            await axios.post("/auth/logout");
            
            // ✅ Clear tokens from localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            console.log("✅ Tokens cleared from localStorage");
            
            set({ user: null });
            toast.success("Logged out successfully");
        } catch (error) {
            // ✅ Clear tokens even if logout request fails
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            set({ user: null });
            toast.error(error.response?.data?.message || "An error occurred during logout");
        }
    },

    checkAuth: async () => {
        set({ checkingAuth: true });
        
        // 🔍 DEBUG: Check tokens before auth check
        console.log("🔍 CheckAuth - accessToken exists:", !!localStorage.getItem('accessToken'));
        console.log("🔍 CheckAuth - Cookie:", document.cookie);
        
        try {
            const response = await axios.get("/auth/profile");
            console.log("✅ CheckAuth successful:", response.data);
            set({ user: response.data, checkingAuth: false });
        } catch (error) {
            console.log("❌ CheckAuth failed:", error.message);
            console.log("❌ Error response:", error.response?.data);
            
            // ✅ Clear tokens if authentication fails
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            
            set({ checkingAuth: false, user: null });
        }
    },

    refreshToken: async () => {
        // Refresh token if access token expired
        if (get().user) {
            try {
                const res = await axios.post("/auth/refresh-token");
                
                // ✅ Update access token in localStorage after refresh
                if (res.data.accessToken) {
                    localStorage.setItem('accessToken', res.data.accessToken);
                    console.log("✅ Token refreshed and stored");
                }
                
                await get().checkAuth();
            } catch (error) {
                // ✅ Clear tokens if refresh fails
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                
                set({ user: null });
                console.log("❌ Token refresh failed:", error.message);
            }
        }
    }
}));