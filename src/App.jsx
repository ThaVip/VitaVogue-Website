import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useState } from "react"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import CategoryPage from "./pages/CategoryPage"
import CartPage from "./pages/CartPage"
import CustomTailoringPage from "./pages/CustomTailoringPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AccountPage from "./pages/AccountPage"
// import {configureStore} from 'redux'

// const store = configureStore()
function App() {
  // Cart state management
  const [cart, setCart] = useState([]);

  // // User authentication state (we'll enhance this later)
  // const [user, setUser] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/custom-tailoring/:categoryId" element={<CustomTailoringPage cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<LoginPage cart={cart} />} />
        <Route path="/accounts/:username" element={<AccountPage />} />
        <Route path="/register" element={<RegisterPage cart={cart} />} />
      </Routes>
    </Router>
  )
}

export default App