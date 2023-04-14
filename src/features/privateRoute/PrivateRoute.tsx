import React from 'react'
import { Outlet } from 'react-router-dom'
// Import { useSelector } from 'react-redux'

// Import { history } from '../../utils/history'

function PrivateRoute (): any {
  // Const auth = useSelector((x: any) => x.auth.value)

  /*
   * Constant-condition
   * if (0) {
   *   return <Navigate to="/login" state={{ from: history.location }} />
   * }
   */

  // Authorized so return outlet for child routes
  return <Outlet />
}

export { PrivateRoute }
