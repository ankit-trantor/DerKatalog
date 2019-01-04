import moment from 'moment';
import { AsyncStorage } from "react-native"
import OAuth from '../lib/oauth';
import DBUtils from '../lib/dbUtils';
import _ from "lodash";


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
  
  return async (dispatch) => {
    try {
      let resultSet = await DBUtils.select('SELECT oauth_token, oauth_token_secret FROM auth WHERE id = 1');
      let oauth_token_secret = null;
      let oauth_token = null;

      let row = _.chain(resultSet).get('rows._array').first().value();
      if (row !== null && row !== undefined) {
        oauth_token = row.oauth_token;
        oauth_token_secret = row.oauth_token_secret;
      }
      if (oauth_token !== null && oauth_token_secret !== null) {
        dispatch({ type: 'GET_TOKEN_SUCCESS', oauth_token: oauth_token, oauth_token_secret: oauth_token_secret });
      } else {
        dispatch({ type: 'GET_TOKEN_FAIL' });
      }

    } catch (err) {
      dispatch({ type: 'GET_TOKEN_FAIL' });
    }
     
  };
}

export function checkIdentity(oauth_token, oauth_token_secret) {
  return async (dispatch) => {
    try {
      let data = await OAuth.checkIdentity(oauth_token, oauth_token_secret);
      data = await OAuth.getUserInformation(data.data.username, oauth_token, oauth_token_secret);
      dispatch({ type: 'CHECK_IDENTITY_SUCCESS', username: data.data.username });
    } catch (err) {
      console.log(err);
      dispatch({ type: 'CHECK_IDENTITY_FAIL' });
    }
      
    
  };

}

export function oauthUser() {
  return async (dispatch) => {
    try {
      let data = await OAuth.authentication();
      await DBUtils.upsert(`INSERT OR REPLACE INTO auth(id, oauth_token, oauth_token_secret) VALUES(1, ?, ?)`, [data.oauth_token, data.oauth_token_secret]);
      dispatch({ type: 'OAUTH_SUCCESS', oauth_token: data.oauth_token, oauth_token_secret: data.oauth_token_secret});
    } catch(err) {
      console.log(err);
      dispatch({ type: 'OAUTH_FAIL' });
    }
       
  };
}