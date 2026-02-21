import { useAuthStore } from '../store/authStore'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ children, redirectTo = '/' }) => {
  const { isLoggedIn } = useAuthStore()

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export default ProtectedRoute
