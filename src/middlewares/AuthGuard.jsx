import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function AuthGuard({children}) {
  const {user} = useSelector(state => state.auth);
  const location = useLocation();
  if (!user) {
    return <Navigate to='/login' state={{path: location.pathname}}/>
  }
  return children
}

export function LoggedIn({children}) {
  const {user} = useSelector(state => state.auth);
  if (user) {
    return <Navigate to='/profile' />
  }
  return children
}

export default AuthGuard