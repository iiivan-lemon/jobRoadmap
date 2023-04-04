import { UserActionEnum, type UserActions, type UserState } from './types'

const defaultState: UserState = {
  name: '',
  surname: '',
  email: '',
  age: '',
  photo: ''
}

export const UserReducer = (state = defaultState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionEnum.SET_NAME: {
      return { ...state, name: action.payload }
    }
    case UserActionEnum.SET_SURNAME: {
      return { ...state, surname: action.payload }
    }
    case UserActionEnum.SET_EMAIL: {
      return { ...state, email: action.payload }
    }
    case UserActionEnum.SET_AGE: {
      return { ...state, age: action.payload }
    }
    case UserActionEnum.SET_PHOTO: {
      return { ...state, photo: action.payload }
    }
    default:
      return state
  }
}

export const userActionName = (payload) => ({
  type: UserActionEnum.SET_NAME,
  payload
})

export const userActionSurname = (payload) => ({
  type: UserActionEnum.SET_SURNAME,
  payload
})

export const userActionEmail = (payload) => ({
  type: UserActionEnum.SET_EMAIL,
  payload
})

export const userActionAge = (payload) => ({
  type: UserActionEnum.SET_AGE,
  payload
})

export const userActionPhoto = (payload) => ({
  type: UserActionEnum.SET_PHOTO,
  payload
})
