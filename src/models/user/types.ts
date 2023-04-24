export interface UserState {
  username: string
  email: string
  avatar: string
  csrf: string
}

export enum UserActionEnum {
  SET_NAME = 'SET_NAME',
  SET_SURNAME = 'SET_SURNAME',
  SET_EMAIL = 'SET_EMAIL',
  SET_AGE = 'SET_AGE',
  SET_PHOTO = 'SET_PHOTO',
  SET_CSRF = 'SET_CSRF'
}

export interface SetNameAction {
  type: UserActionEnum.SET_NAME
  payload: string
}

export interface SetSurnameAction {
  type: UserActionEnum.SET_SURNAME
  payload: string
}

export interface SetEmailAction {
  type: UserActionEnum.SET_EMAIL
  payload: string
}

export interface SetAgeAction {
  type: UserActionEnum.SET_AGE
  payload: string
}

export interface SetPhotoAction {
  type: UserActionEnum.SET_PHOTO
  payload: string
}

export interface SetCsrfAction {
  type: UserActionEnum.SET_CSRF
  payload: string
}

export type UserActions = SetEmailAction | SetAgeAction | SetNameAction | SetPhotoAction | SetSurnameAction | SetCsrfAction
