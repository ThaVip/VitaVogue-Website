import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Import } from 'lucide-react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';
import { setAuthenticationHeader } from '../../utils/authenticate';




export default function LoginPage({ cart = [] }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  setIsLoading(true);
  
  try {
    console.log('Login attempt:', formData);
    
    const response = await axios.post('http://localhost:3000/login', {
      username: formData.username,
      password: formData.password
    });
    
    console.log('Full response:', response);
    console.log('Response data:', response.data);
    
    // Your backend returns { success: true/false, token?, message? }
    if (response.data.success === true && response.data.token) {
      const token = response.data.token;
      
      console.log('Login successful, token:', token);
      
      // Save the token in localStorage
      localStorage.setItem('jwtwebtoken', token);

      //save the username in localstorage
      localStorage.setItem('username', formData.username)
      
      // Set the authentication header for future requests
      setAuthenticationHeader(token);

      
      // Clear previous errors
      setErrors({});
      
      // Show success message (optional)
      console.log('Navigating to home page...');
      
      // Navigate to the home page
      navigate('/');
      
    } else {
      // Handle unsuccessful login
      console.log('Login failed:', response.data.message);
      setErrors({
        submit: response.data.message || 'Login failed. Please try again.'
      });
    }
    
  } catch (error) {
    console.error('Login error - Full error object:', error);
    
    if (error.response) {
      // Server responded with error status
      console.log('Server error status:', error.response.status);
      console.log('Server error data:', error.response.data);
      
      const errorMessage = error.response.data?.message || 
                          error.response.data?.error || 
                          `Server error (${error.response.status})`;
      setErrors({ submit: errorMessage });
      
    } else if (error.request) {
      // Request was made but no response received
      console.log('No response received:', error.request);
      setErrors({
        submit: 'Cannot connect to server. Make sure the server is running on http://localhost:3000'
      });
      
    } else {
      // Something else happened
      console.log('Request setup error:', error.message);
      setErrors({
        submit: `Connection error: ${error.message}`
      });
    }
  } finally {
    setIsLoading(false);
  }
};




  // const response = await fetch('http://localhost:3000/login', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(formData)
  // });

  // const result = await response.json();
  // if (result.success == true) {
  //   const token = result.token
  //   // put the token into the local storage
  //   localStorage.setItem('jsonwebtoken', token)
  // }
  // console.log(result)


  //     if (result.success) {
  //       alert('login successful')
  //     } else {
  //       setErrors({ submit: result.message || 'login failed' })
  //     }

  //     // TODO: Handle successful login (redirect, save token, etc.)
  //     //http://localhost:3000/login

  //   } catch (error) {
  //     setErrors({ submit: 'Login failed. Please check your credentials.' });
  //   } finally {
  //     setIsLoading(false);
  //   }


  return (
    <>
      <Header cart={cart} />

      <section className="min-h-screen py-16 md:py-24 bg-gradient-to-br from-gray-50 to-yellow-50">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-yellow-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">👋</div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">Sign in to your Vitavogue account</p>
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    placeholder="Enter your "
                    disabled={isLoading}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-yellow-600 hover:text-yellow-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-3 px-6 rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
              
            </form> 


            {/* Divider */}
            <div className="my-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                <span className="text-sm font-medium text-gray-700">Facebook</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}