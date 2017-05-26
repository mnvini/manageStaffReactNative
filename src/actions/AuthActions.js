import firebase from 'firebase'
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types'
import { resetAction } from '../Router'


export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (password) => {
  return {
    type: PASSWORD_CHANGED,
    payload: password
  }
}

export const loginUser = ({ email, password, navigation }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSucess(user, navigation))
      .catch((error) => {
        console.log(error)
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSucess(user, navigation))
          .catch(() => loginUserFail(dispatch))
      })
  }
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL })
}

const loginUserSucess = (user, navigation) => {
  navigation.dispatch({
    type: LOGIN_USER_SUCESS,
    payload: user
  })
  navigation.dispatch(resetAction)
}
