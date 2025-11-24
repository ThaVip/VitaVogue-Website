// import { create } from 'zustand';
// import { toast } from 'react-hot-toast';
// import axios from '../../lib/axios';

// export const useUserStore = create((set, get) => ({
//     user: null,
//     loading: false,
//     checkingAuth: true,

//     signup: async ({ name, email, phone, password, confirmPassword }) => {
//         set({ loading: true });

//         if (password !== confirmPassword) {
//             set({ loading: false });
//             return toast.error("Passwords do not match");
//         }

//         try {
//             const res = await axios.post("/auth/signup", { name, email, phone, password });
//             set({ user: res.data.user, loading: false }); // ✅ Extract user from response
//             toast.success("Account created successfully!");
//             return { success: true };
//         } catch (error) {
//             set({ loading: false });
//             if (error.response) {
//                 console.error("Response error:", error.response);
//                 toast.error(error.response.data.message || `Error ${error.response.status}: ${error.response.statusText}`);
//             } else if (error.request) {
//                 toast.error("Cannot connect to server. Please check your connection.");
//             } else {
//                 toast.error("An error occurred: " + error.message);
//             }
//             console.error("Signup error:", error);
//             return { success: false };
//         }
//     },

//     login: async ({ email, password }) => {
//         set({ loading: true });

//         try {
//             const res = await axios.post("/auth/login", { email, password });
//             set({ user: res.data, loading: false });
//             toast.success("Welcome back!");
//             return { success: true };
//         } catch (error) {
//             set({ loading: false });
//             if (error.response) {
//                 console.error("Response error:", error.response);
//                 toast.error(error.response.data.message || `Error ${error.response.status}: ${error.response.statusText}`);
//             } else if (error.request) {
//                 toast.error("Cannot connect to server. Please check your connection.");
//             } else {
//                 toast.error("An error occurred: " + error.message);
//             }
//             console.error("Login error:", error);
//             return { success: false };
//         }
//     },

//     logout: async () => {
//         try {
//             await axios.post("/auth/logout");
//             set({ user: null });
//             toast.success("Logged out successfully");
//         } catch (error) {
//             toast.error(error.response?.data?.message || "An error occurred during logout");
//         }
//     },

//     checkAuth: async () => {
//         set({ checkingAuth: true });
//         try {
//             const response = await axios.get("/auth/profile");
//             set({ user: response.data, checkingAuth: false });
//         } catch (error) {
//             console.log("Not authenticated:", error.message);
//             set({ checkingAuth: false, user: null });
//         }
//     },

//     refreshToken: async () => {
//         // Refresh token if access token expired
//         if (get().user) {
//             try {
//                 await axios.post("/auth/refresh-token");
//                 await get().checkAuth();
//             } catch (error) {
//                 set({ user: null });
//                 console.log("Token refresh failed:", error.message);
//             }
//         }
//     }
// }));

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
            
            // ✅ Store tokens in localStorage for mobile compatibility
            if (res.data.accessToken) {
                localStorage.setItem('accessToken', res.data.accessToken);
            }
            if (res.data.refreshToken) {
                localStorage.setItem('refreshToken', res.data.refreshToken);
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
            
            // ✅ Store tokens in localStorage for mobile compatibility
            if (res.data.accessToken) {
                localStorage.setItem('accessToken', res.data.accessToken);
            }
            if (res.data.refreshToken) {
                localStorage.setItem('refreshToken', res.data.refreshToken);
            }
            
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
        try {
            const response = await axios.get("/auth/profile");
            set({ user: response.data, checkingAuth: false });
        } catch (error) {
            console.log("Not authenticated:", error.message);
            
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
                }
                
                await get().checkAuth();
            } catch (error) {
                // ✅ Clear tokens if refresh fails
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                
                set({ user: null });
                console.log("Token refresh failed:", error.message);
            }
        }
    }
}));
