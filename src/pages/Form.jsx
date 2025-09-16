import React from 'react'
import { useState } from 'react'

function Form() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    confirmpassword: ''
  })
  
  const [errors, setErrors] = useState({})
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev, 
      [name]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {};
    
    // First name validation
    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required"
    }
    
    // Last name validation
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required"
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    
    // Phone validation (Nigerian format)
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+234|0)[789][01]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Nigerian phone number';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    // Confirm password validation
    if (!formData.confirmpassword) {
      newErrors.confirmpassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = 'Passwords do not match';
    }
    
    // Terms acceptance
    if (!acceptTerms) {
      newErrors.terms = 'You must accept the Terms of Service and Privacy Policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    try {
      console.log('Registration attempt:', formData)
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert('Registration successful!')
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name</label>
          <input 
            type="text" 
            id="firstname"
            name="firstname"
            onChange={handleInputChange} 
            value={formData.firstname}
          />
          {errors.firstname && <span style={{color: 'red'}}>{errors.firstname}</span>}
        </div>

        <div>
          <label htmlFor="lastname">Last Name</label>
          <input 
            type="text" 
            id="lastname"
            name="lastname"
            onChange={handleInputChange} 
            value={formData.lastname}
          />
          {errors.lastname && <span style={{color: 'red'}}>{errors.lastname}</span>}
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input 
            type="tel" 
            id="phone"
            name="phone"
            onChange={handleInputChange} 
            value={formData.phone}
            placeholder="+234 or 0"
          />
          {errors.phone && <span style={{color: 'red'}}>{errors.phone}</span>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            name="email"
            onChange={handleInputChange} 
            value={formData.email}
          />
          {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            name="password"
            onChange={handleInputChange} 
            value={formData.password}
          />
          {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
        </div>

        <div>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmpassword"
            name="confirmpassword"
            onChange={handleInputChange} 
            value={formData.confirmpassword}
          />
          {errors.confirmpassword && <span style={{color: 'red'}}>{errors.confirmpassword}</span>}
        </div>

        <div>
          <label>
            <input 
              type="checkbox" 
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            I accept the Terms of Service and Privacy Policy
          </label>
          {errors.terms && <span style={{color: 'red'}}>{errors.terms}</span>}
        </div>

        {errors.submit && <div style={{color: 'red'}}>{errors.submit}</div>}

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form