import moment from 'moment';

export default function reducer(state = { date: moment() }, action) {
  switch (action.type) {
    case 'GET_DATE':
      return { ...state, loading: true };
    case 'GET_DATE_SUCCESS':
      console.log(action);
      return { ...state, loading: false, date: action.date };
    case 'GET_DATE_FAIL':
      return {
        ...state,
        loading: false,
        error: 'Error while fetching repositories'
      };
    default:
      return state;
  }
}

export function getDate() {
  return (dispatch) => {
    dispatch({type: 'GET_DATE'});
    dispatch({type: 'GET_DATE_SUCCESS', date: moment()});
  };
}