import React from 'react'
import { Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// import { history } from '../../utils/history'

function PrivateRoute (): any {
  // const auth = useSelector((x: any) => x.auth.value)

  // constant-condition
  // if (0) {
  //   return <Navigate to="/login" state={{ from: history.location }} />
  // }

  // authorized so return outlet for child routes
  return <Outlet />
}

export { PrivateRoute }
