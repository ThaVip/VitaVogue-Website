import {create} from 'zustand'
import {toast} from 'react-hot-toast'
import axios from '../../lib/axios'

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ name, email, phone, password, confirmPassword}) => {
        set({loading: true})

        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Passwords do not match");
        }

        try {
            const res = await axios.post("/auth/signup", { name, email, phone, password });
            set({ user: res.data, loading: false });
            toast.success("Account created successfully!");
            return { success: true };
        } catch (error) {
            set({ loading: false });
            // Handle different error scenarios
            if (error.response) {
                // Server responded with error status
                console.error("Response error:", error.response);
                toast.error(error.response.data.message || `Error ${error.response.status}: ${error.response.statusText}`);
            } else if (error.request) {
                // Request made but no response received
                toast.error("Cannot connect to server. Please make sure the backend is running.");
            } else {
                // Something else happened
                toast.error("An error occurred: " + error.message);
            }
            console.error("Signup error:", error);
        }
    },

    login: async ({ email, password }) => {
        set({ loading: true });

        try {
            const res = await axios.post("/auth/login", { email, password });
            set({ user: res.data, loading: false });
            toast.success("Welcome back!");
            return { success: true };
        } catch (error) {
            set({ loading: false });
            if (error.response) {
                console.error("Response error:", error.response);
                toast.error(error.response.data.message || `Error ${error.response.status}: ${error.response.statusText}`);
            } else if (error.request) {
                toast.error("Cannot connect to server. Please make sure the backend is running.");
            } else {
                toast.error("An error occurred: " + error.message);
            }
            console.error("Login error:", error);
        }
    },

  logout: async () => {
    try {
        await axios.post("/auth/logout");
        set({ user: null });
        
        // Clear cart on logout
        useCartStore.getState().clearCart();
        
        toast.success("Logged out successfully");
    } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred during logout");
    }
},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get("/auth/profile");
			set({ user: response.data, checkingAuth: false });
		} catch (error) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	}

}))