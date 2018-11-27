import moment from 'moment';
import { AsyncStorage } from "react-native"
import OAuth from '../lib/oauth';


export default function reducer(state = { date: moment() }, action) {
  switch (action.type) {
    case 'GET_TOKEN':
      return { ...state, loading: true };
    case 'GET_TOKEN_SUCCESS':
    case 'OAUTH_SUCCESS':
      return { ...state, loading: false, next: 'checkIdentity', oauth_token: action.oauth_token, oauth_token_secret: action.oauth_token_secret };
    case 'GET_TOKEN_FAIL':
    case 'OAUTH_FAIL':
      return { ...state, loading: false, error: 'No token', next : 'fromScratch' };
    case 'CHECK_IDENTITY':
      return { ...state, loading: true };
    case 'CHECK_IDENTITY_SUCCESS':
      return { ...state, loading: true, username : action.username, next: 'goToLibrary' };
    case 'CHECK_IDENTITY_FAIL':
      return { ...state, loading: true, error: 'Cannot check identity', next: 'fromScratch' };
    default:
      return state;
  }
}

export function getToken() {
  return (dispatch) => {
    AsyncStorage.multiGet(['oauth_token', 'oauth_token_secret']).then(arr => {
      let oauth_token_secret = null;
      let oauth_token = null;

      _.forEach(arr, e => {
        if (e[0] === 'oauth_token_secret') {
          oauth_token_secret = e[1];
        } else if (e[0] === 'oauth_token') {
          oauth_token = e[1];
        }
      });

      if (oauth_token !== null && oauth_token_secret !== null) {
        dispatch({ type: 'GET_TOKEN_SUCCESS', oauth_token: oauth_token, oauth_token_secret: oauth_token_secret });
      } else {
        dispatch({ type: 'GET_TOKEN_FAIL' });
      }

    }).catch(err => {
      dispatch({ type: 'GET_TOKEN_FAIL' });
    });
  };
}

export function checkIdentity(oauth_token, oauth_token_secret) {
  return (dispatch) => {
    OAuth.checkIdentity(oauth_token, oauth_token_secret).then(data => {
      return OAuth.getUserInformation(data.data.username, oauth_token, oauth_token_secret);
    }).then(data => {
      dispatch({ type: 'CHECK_IDENTITY_SUCCESS', username: data.data.username });
    }).catch(err => {      
      dispatch({ type: 'CHECK_IDENTITY_FAIL' });
    });
  };

}

export function oauthUser() {
  return (dispatch) => {
    OAuth.authentication().then(data => {
      AsyncStorage.multiSet([['oauth_token', data.oauth_token], ['oauth_token_secret', data.oauth_token_secret]]);
      return {oauth_token: data.oauth_token, oauth_token_secret: data.oauth_token_secret};
    }).then((data) => {
      console.log(data);
      dispatch({ type: 'OAUTH_SUCCESS', ...data});
    }).catch(err => {
      dispatch({ type: 'OAUTH_FAIL' });
    });
  }
}