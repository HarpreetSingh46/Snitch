import { RouterProvider } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'
import routes from "./app.routes.jsx"
import { useSelector } from 'react-redux'
import { userAuth } from '../features/auth/hook/useAuth.js'
const App = () => {
  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)
  const { handleGetMe } = userAuth()
  useEffect(() => {
    handleGetMe()
  }, [])
  return (
    <RouterProvider router={routes} />
  )
}

export default App  