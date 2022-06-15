import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem('user')) {
    return <Navigate to="/" replace />
  }

  return children
}
export default ProtectedRoute
