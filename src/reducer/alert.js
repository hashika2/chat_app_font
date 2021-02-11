import { SET_ALERT, REMOVE_ALERT } from '../action/types';

const initialState = {
  alert_data : []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_ALERT':
      return {...state, alert_data : payload };   
    case 'REMOVE_ALERT':
      // return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
