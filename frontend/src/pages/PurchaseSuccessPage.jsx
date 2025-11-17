import { ArrowRight, CheckCircle, Package, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import axios from "../../lib/axios";
import Confetti from "react-confetti";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);
	const [orderDetails, setOrderDetails] = useState(null);
	const location = useLocation();

	useEffect(() => {
		const handleCheckoutSuccess = async (reference) => {
			try {
				// Changed to GET request to match your backend
				const response = await axios.get(`/payments/verify?reference=${reference}`);
				
				if (response.data.success) {
					setOrderDetails(response.data);
					clearCart();
				} else {
					setError("Payment verification failed. Please contact support.");
				}
			} catch (error) {
				console.log(error);
				setError("Failed to verify payment. Please contact support.");
			} finally {
				setIsProcessing(false);
			}
		};

		// Get reference from URL query params (Paystack adds this)
		const params = new URLSearchParams(location.search);
		const reference = params.get("reference");
		
		if (reference) {
			handleCheckoutSuccess(reference);
		} else {
			setIsProcessing(false);
			setError("No payment reference found in the URL");
		}
	}, [clearCart, location]);

	if (isProcessing) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400 mx-auto mb-4"></div>
					<p className="text-gray-600 text-lg">Processing your payment...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50 flex items-center justify-center px-4">
				<div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
					<div className="text-red-500 text-6xl mb-4">⚠️</div>
					<h2 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h2>
					<p className="text-gray-600 mb-6">{error}</p>
					<Link
						to="/"
						className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-3 px-6 rounded-lg hover:scale-105 transition-all"
					>
						Return to Home
					</Link>
				</div>
			</div>
		);
	}

	return (
		<>
			<Header />
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50 py-16 md:py-24 px-4">
				<Confetti
					width={window.innerWidth}
					height={window.innerHeight}
					gravity={0.1}
					numberOfPieces={500}
					recycle={false}
				/>
				
				<div className="max-w-2xl mx-auto">
					{/* Success Icon */}
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-4 animate-bounce">
							<CheckCircle className="w-12 h-12 text-white" />
						</div>
						<h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
							Payment Successful! 🎉
						</h1>
						<p className="text-gray-600 text-lg">
							Thank you for shopping with Vitavogue!
						</p>
					</div>

					{/* Order Details Card */}
					<div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
						<div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200">
							<Package className="w-6 h-6 text-yellow-500" />
							<h2 className="text-xl font-bold text-gray-800">Order Confirmed</h2>
						</div>

						<div className="space-y-4 mb-6">
							<div className="flex items-center justify-between py-3 border-b border-gray-100">
								<span className="text-gray-600">Order ID</span>
								<span className="font-semibold text-gray-800">
									{orderDetails?.orderId ? `#${orderDetails.orderId.slice(-8).toUpperCase()}` : "#VITAVOGUE-001"}
								</span>
							</div>
							
							<div className="flex items-center justify-between py-3 border-b border-gray-100">
								<span className="text-gray-600">Total Amount</span>
								<span className="font-bold text-xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
									₦{(orderDetails?.totalAmount || 0).toLocaleString()}
								</span>
							</div>

							
						</div>

						{/* Info Box */}
						<div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 mb-6">
							<p className="text-sm text-gray-700 text-center">
								📧 Order confirmation has been sent to your email
							</p>
						</div>

						{/* Action Buttons */}
						<div className="space-y-3">
							<Link
								to="/"
								className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg"
							>
								Continue Shopping
								<ArrowRight className="ml-2" size={20} />
							</Link>
						</div>
					</div>

					{/* Thank You Message */}
					<div className="text-center">
						<p className="text-gray-600 text-lg">
							Thank you for trusting Vitavogue! 💛
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default PurchaseSuccessPage;