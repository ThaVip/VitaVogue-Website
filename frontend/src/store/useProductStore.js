import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../../lib/axios";

export const useProductStore = create((set) => ({
	products: [],
	loading: false,

	setProducts: (products) => set({ products }),
	createProduct: async (productData) => {
		set({ loading: true });
		try {
			console.log(productData)
			const res = await axios.post("/products", productData);
			console.log("products", res.data)
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));

			toast.success("Product created successfully");
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to create product");
			set({ loading: false });
		}
	},

	fetchFeaturedProducts : async()  => {
		set({loading: true})
		try {
			const response = await axios.get("/products/featured");
			set({products: response.data, loading: false})
		} catch (error) {
			set({error: "Failed to fetch featured products", loading: false})
			console.log("Error fetching featured products", error.message)
		}
	},

	fetchAllProducts: async () => {
    set({ loading: true });
    try {
        const response = await axios.get("/products");
        set({ products: response.data.products, loading: false });
    } catch (error) {
        set({ loading: false });
        
        // Safe error handling
        if (error.response) {
            // Server responded with error
            toast.error(error.response.data?.error || "Failed to fetch products");
        } else if (error.request) {
            // Request made but no response (server not running)
            toast.error("Cannot connect to server. Please start the backend.");
        } else {
            // Something else went wrong
            toast.error(error.message || "An error occurred");
        }
        console.error("Fetch error:", error);
    }
},
	
	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.message || "Failed to delete product");
		}



	},

	fetchProductsByCategory: async (category) => {
			set({loading: true});
			try {
				const response = await axios.get(`/products/category/${category}`)
				set ({products: response.data.products, loading: false})
			} catch (error) {
				set({error: "Failed to fetch products", loading: false})
				console.error(error.response.data.error || "Failed to fetch products")
			}
		
	},	
	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/products/${productId}`);
			// this will update the isFeatured prop of the product
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.error || "Failed to update product");
		}
	},

	updateProduct: async (productId, productData) => {
		set({ loading: true });
		try {
			const response = await axios.put(`/products/${productId}`, productData);
			set((prevState) => ({
				products: prevState.products.map((product) =>
					product._id === productId ? { ...product, ...response.data } : product
				),
				loading: false,
			}));
			toast.success("Product updated successfully");
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.error || "Failed to update product");
		}
	},


}));