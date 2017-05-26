import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_FIRED_SUCCESS,
  NEW_EMPLOYEE
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value }
    case EMPLOYEE_CREATE:
      return INITIAL_STATE
    case EMPLOYEE_SAVE_SUCCESS:
      return INITIAL_STATE
    case EMPLOYEE_FIRED_SUCCESS:
      return INITIAL_STATE
    case NEW_EMPLOYEE:
      return INITIAL_STATE
    default:
      return state;
  }
}
