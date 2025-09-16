import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { setAuthenticationHeader } from "../../utils/authenticate"



export default function AccountPage() {

  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { username } = useParams()
  const navigate = useNavigate()
  // fires when the page is renderd and the empty array makes it fire once
  useEffect(() => {
    getAllAccounts()
  }, [])

  // create the function in useEffect
  const getAllAccounts = async () => {

    try {
      setLoading(true)
      setError(null)
      //get the token from localstorage
      const token = localStorage.getItem('jwtwebtoken')
      const username = localStorage.getItem('username')

      if (!token) {
        setError('Login to access your account')
        navigate('/login')
        return
      }

      //set auth header
      setAuthenticationHeader(token)

      //make the API call
      const response = await axios.get(`http://localhost:3000/accounts/${username}`)


      setAccounts(response.data)
    } catch (error) {
      console.error('Error fetching accounts:', error)

      if (error.response?.status === 401) {
        setError('Authentication failed. Please login again.')
        // Clear invalid token
        localStorage.removeItem('jsonwebtoken')
        navigate('/login')
      } else {
        setError('Failed to fetch accounts. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading accounts...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    )
  }

  if (accounts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600 text-xl">No accounts found for {username}</div>
      </div>
    )
  }


  return (

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Accounts for {username}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account, index) => {
          return (
            <div
              key={index}
              className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border-2 border-transparent hover:border-yellow-400 overflow-hidden cursor-pointer group'
            >
              <div className="h-32 bg-gradient-to-br from-black to-gray-800 flex items-center justify-center text-4xl text-yellow-400 rounded-lg mb-4">
                <span className="group-hover:scale-110 transition-transform duration-300">
                  {account.username}
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2 capitalize">
                  {account.accountType}
                </h3>
                <p className="text-gray-600 text-lg font-semibold">
                  ${account.balance.toLocaleString()}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


