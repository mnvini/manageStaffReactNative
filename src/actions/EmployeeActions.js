import firebase from 'firebase';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_FIRED_SUCCESS,
  NEW_EMPLOYEE
} from './types'
import { resetAction } from '../Router'

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  }
}

export const employeeCreate = ({ name, phone, shift, navigation }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        navigation.dispatch(resetAction)
        dispatch({ type: EMPLOYEE_CREATE })
      })
  }
}

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() })
      })
  }
}

export const employeeSave = ({ name, phone, shift, uid, navigation }) => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        navigation.dispatch(resetAction)
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS })
      })
  }
}

export const employeeDelete = ({ uid, navigation }) => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        navigation.dispatch(resetAction)
        dispatch({ type: EMPLOYEE_FIRED_SUCCESS })
      })
  }
}

export const newEmployee = () => {
  return {
    type: NEW_EMPLOYEE,
  }
}
