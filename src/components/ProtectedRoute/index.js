import {Navigate, Outlet} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  const userId = Cookies.get('user_id')
  if (token === undefined) {
    return <Navigate to="/login" replace/>
  }
  return <Outlet/>
}

export default ProtectedRoute