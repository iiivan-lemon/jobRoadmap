import { authActionAuth, authActionError } from './authReducer'
import { login, registration } from '../user/userActions'
import axios from 'axios'
import { apiUrl } from '../../app/store'

export const loginOrLogout = (auth, user?) => async (dispatch) => {
  let message
  try {
    if (user !== undefined) {
      if (user.hasOwnProperty('username')) {
        message = await dispatch(registration(user))
        if (message === 500) {
          throw 500
        }

        if (message === 400) {
          throw 400
        }

        return message
      }

      message = await dispatch(login(user))

      if (message === 401) {
        throw 401
      }

      if (message === 404) {
        throw 404
      }

      if (message === 500) {
        throw 500
      }

      dispatch(authActionAuth(auth))

      return true
    }

    const res = await axios({
      baseURL: apiUrl,
      url: '/logout',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })

    dispatch(authActionAuth(auth))

    return res.data.status
  } catch (error) {
    if (error === 400) {
      dispatch(authActionError('Такая почта уже зарегистрирована'))
    }

    if (error === 401) {
      dispatch(authActionError('Подтвердите почту'))
    }

    if (error === 404) {
      dispatch(authActionError('Неверные данные'))
    }

    if (error === 500) {
      dispatch(authActionError('Упс... Пожалуйста, зайдите позже'))
    }
  }
}

export const deleteError = () => async (dispatch) => {
  dispatch(authActionError(''))
}
