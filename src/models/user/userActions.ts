import axios from 'axios'
import { apiUrl } from '../../app/store'
import { authActionAuth, authActionLoading } from '../auth/authReducer'
import {
  userActionAge, userActionCsrf, userActionEmail,
  userActionName,
  userActionPhoto,
  userActionSurname
} from './userReducer'

export const registration = (user) => async (dispatch) => {
  try {
    dispatch(authActionLoading(true))

    const res = await axios({
      baseURL: apiUrl,
      url: '/signup',
      method: 'POST',
      data: user,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })

    return res.data.message
  } catch (error: any) {
    if (error.response.data.status === 400) {
      return 400
    }

    if (Math.trunc(error.response.data.status / 100) === 5) {
      return 500
    }
  } finally {
    dispatch(authActionLoading(false))
  }
}

export const login = (user) => async (dispatch) => {
  try {
    dispatch(authActionLoading(true))

    const res = await axios({
      baseURL: apiUrl,
      url: '/login',
      method: 'POST',
      data: user,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })

    dispatch(loadingProfile())
  } catch (error: any) {
    if (error.response.data.status === 401) {
      return 401
    }

    if (error.response.data.status === 404) {
      return 404
    }

    if (Math.trunc(error.response.data.status / 100) === 5) {
      return 500
    }
  } finally {
    dispatch(authActionLoading(false))
  }
}

export const loadingProfile = () => async (dispatch) => {
  try {
    dispatch(authActionLoading(true))

    const res = await axios({
      baseURL: apiUrl,
      url: '/profile',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })

    if (res.data.status === 200) {
      dispatch(authActionAuth(true))
      dispatch(userActionName(res.data.user.username))
      dispatch(userActionEmail(res.data.user.email))
      dispatch(userActionPhoto(res.data.user.avatar))

      return true
    }
  } catch (error: any) {
    if (error.response.data.status === 401) {
      return 401
    }

    if (Math.trunc(error.response.data.status / 100) === 5) {
      return 500
    }
  } finally {
    dispatch(authActionLoading(false))
  }
}

export const editUserData = (user) => async (dispatch) => {
  try {
    dispatch(authActionLoading(true))
    const csrfToken = await dispatch(getToken())
    const res = await axios({
      baseURL: apiUrl,
      url: '/edit',
      method: 'PUT',
      data: user,
      headers: { 'Content-Type': 'application/json', 'csrf-token': csrfToken },
      withCredentials: true
    })

    return res.data.message
  } catch (error: any) {
    if (error.response.data.status === 400) {
      return 400
    }

    if (Math.trunc(error.response.data.status / 100) === 5) {
      return 500
    }
  } finally {
    dispatch(authActionLoading(false))
  }
}

export const editAvatar = (user) => async (dispatch) => {
  try {
    dispatch(authActionLoading(true))

    const csrfToken = await dispatch(getToken())
    const res = await axios({
      baseURL: apiUrl,
      url: '/avatar',
      method: 'PUT',
      data: user,
      headers: {
        'Content-Type': 'multipart/form-data',
        'csrf-token': csrfToken
      },
      withCredentials: true
    })
    // csrf-token
    if (res.data.status === 200) {
      dispatch(authActionAuth(true))
      dispatch(loadingProfile())

      return true
    }
    return res.data.message
  } catch (error: any) {
    if (error.response.data.status === 400) {
      return 400
    }

    if (Math.trunc(error.response.data.status / 100) === 5) {
      return 500
    }
  } finally {
    dispatch(authActionLoading(false))
  }
}

export const getToken = () => async (dispatch) => {
  try {
    const res = await axios({
      baseURL: apiUrl,
      url: '/csrf',
      method: 'GET'
    })

    // csrf-token
    return res.data.message
  } catch (error: any) {
    if (error.response.data.status === 400) {
      return 400
    }

    if (Math.trunc(error.response.data.status / 100) === 5) {
      return 500
    }
  } finally {
    dispatch(authActionLoading(false))
  }
}
