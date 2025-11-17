import { XCircle, ArrowLeft, Home, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PurchaseCancelPage = () => {
	return (
		<>
			<Header />
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50 py-16 md:py-24 px-4 flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="max-w-2xl w-full"
				>
					{/* Cancel Icon */}
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
							<XCircle className="w-12 h-12 text-red-500" />
						</div>
						<h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
							Payment Cancelled
						</h1>
						<p className="text-gray-600 text-lg">
							Your order has been cancelled. No charges were made.
						</p>
					</div>

					{/* Info Card */}
					<div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
						<div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 mb-6">
							<h3 className="font-semibold text-gray-800 mb-2 flex items-center">
								<span className="text-2xl mr-2">ℹ️</span>
								What happened?
							</h3>
							<p className="text-gray-700 text-sm leading-relaxed">
								You cancelled the payment process. Your cart items are still saved and waiting for you.
							</p>
						</div>

						{/* Help Section */}
						<div className="border-t border-gray-200 pt-6 mb-6">
							<h3 className="font-semibold text-gray-800 mb-3 flex items-center">
								<MessageCircle className="w-5 h-5 mr-2 text-yellow-500" />
								Need Help?
							</h3>
							<p className="text-gray-600 text-sm mb-4">
								If you encountered any issues during checkout or have questions about your order, our support team is here to help.
							</p>
							<div className="flex flex-col sm:flex-row gap-3">
								
									< a href="mailto:support@vitavogue.com"
									className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition-all text-center text-sm"
								>
									📧 Email Support
								</a>
								
									< a href="tel:+2349012345678"
									className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition-all text-center text-sm"
								>
									📞 Call Us
								</a>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="space-y-3">
							<Link
								to="/cart"
								className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg"
							>
								<ArrowLeft className="mr-2" size={20} />
								Back to Cart
							</Link>
							
							<Link
								to="/"
								className="w-full bg-white border-2 border-gray-200 text-gray-700 font-bold py-4 px-6 rounded-xl hover:border-yellow-400 hover:text-yellow-600 transition-all duration-300 flex items-center justify-center"
							>
								<Home className="mr-2" size={20} />
								Return to Home
							</Link>
						</div>
					</div>

					{/* Common Issues */}
					<div className="bg-white rounded-2xl shadow-lg p-6">
						<h3 className="font-semibold text-gray-800 mb-4">Common reasons for cancellation:</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li className="flex items-start">
								<span className="text-yellow-500 mr-2">•</span>
								<span>Changed your mind about the items</span>
							</li>
							<li className="flex items-start">
								<span className="text-yellow-500 mr-2">•</span>
								<span>Payment method issues</span>
							</li>
							<li className="flex items-start">
								<span className="text-yellow-500 mr-2">•</span>
								<span>Want to add more items to your cart</span>
							</li>
							<li className="flex items-start">
								<span className="text-yellow-500 mr-2">•</span>
								<span>Need to use a different delivery address</span>
							</li>
						</ul>
					</div>
				</motion.div>
			</div>
			<Footer />
		</>
	);
};

export default PurchaseCancelPage;