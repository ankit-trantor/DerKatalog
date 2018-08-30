import { default as conf } from '../conf/conf';
import moment from 'moment';
import { default as axios } from "axios";
import { default as queryString } from "query-string";
import { AuthSession } from 'expo';
import { AsyncStorage } from "react-native"


class OAuth {

  oauth_token = null;
  oauth_token_secret = null;
  promiseLectureToken = null;

  constructor() {
    this.promiseLectureToken = AsyncStorage.multiGet(['oauth_token', 'oauth_token_secret']);
  }

  authentication() {
    let oauthSecret = null;
    let authStr = `OAuth oauth_consumer_key="${conf.discogs.oauth.key}", oauth_nonce="${moment().valueOf()}",`
      + ` oauth_signature="${conf.discogs.oauth.secret}&", oauth_signature_method="PLAINTEXT", oauth_timestamp="${moment().valueOf()}",`
      + ` oauth_callback="${conf.discogs.oauth.callback_url}"`;

    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: conf.discogs.oauth.request_token_url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization": authStr,
          "User-Agent": conf.app_user_agent
        }
      }).then(async (response) => {
        const { oauth_token, oauth_token_secret } = queryString.parse(response.data);
        oauthSecret = oauth_token_secret;
        return AuthSession.startAsync({
          authUrl: `${conf.discogs.oauth.authorize_url}${oauth_token}`,
          returnUrl: conf.discogs.oauth.callback_url
        });

      }).then(data => {
        AuthSession.dismiss();

        const { oauth_token, oauth_verifier } = data.params;
        authStr = `OAuth oauth_consumer_key="${conf.discogs.oauth.key}", oauth_nonce="${moment().valueOf()}",`
          + ` oauth_token="${oauth_token}", oauth_verifier="${oauth_verifier}",`
          + ` oauth_signature="${conf.discogs.oauth.secret}&${oauthSecret}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${moment().valueOf()}"`;

        return axios({
          method: 'post',
          url: conf.discogs.oauth.access_token_url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": authStr,
            "User-Agent": conf.app_user_agent
          }
        });

      }).then(response => {
        const { oauth_token, oauth_token_secret } = queryString.parse(response.data);
        this.oauth_token = oauth_token;
        this.oauth_token_secret = oauth_token_secret;
        return Promise.all([this._storeData("oauth_token", oauth_token), this._storeData("oauth_token_secret", oauth_token_secret)]);
      }).then(arr => {
        this.promiseLectureToken = AsyncStorage.multiGet(['oauth_token', 'oauth_token_secret']);
        return this.checkIdentity();
      }).then(d => {
        resolve();
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }

  checkIdentity() {
    return this.getRequest(`${conf.discogs.api_url}${conf.discogs.endpoints.identity}`);
  }

  getUserInformation(username) {
    console.log(`${conf.discogs.api_url}${_.replace(conf.discogs.endpoints.user, '{username}', username)}`);
    return this.getRequest(`${conf.discogs.api_url}${_.replace(conf.discogs.endpoints.user, '{username}', username)}`);
  }


  postRequest(url) {
    authStr = `OAuth oauth_consumer_key="${conf.discogs.oauth.key}", oauth_nonce="${moment().valueOf()}",`
      + ` oauth_token="${this.oauth_token}",`
      + ` oauth_signature="${conf.discogs.oauth.secret}&${this.oauth_token_secret}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${moment().valueOf()}"`;

    return axios({
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": authStr,
        "User-Agent": conf.app_user_agent
      }
    });
  }

  getRequest(url) {
    let authStr = `OAuth oauth_consumer_key="${conf.discogs.oauth.key}", oauth_nonce="${moment().valueOf()}",`
      + ` oauth_token="${this.oauth_token}",`
      + ` oauth_signature="${conf.discogs.oauth.secret}&${this.oauth_token_secret}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${moment().valueOf()}"`;

    return axios({
      method: 'get',
      url: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": authStr,
        "User-Agent": conf.app_user_agent
      }
    });
  }



  _storeData(key, value) {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, value, (error) => {
        if (error === null) {
          resolve();
        } else {
          reject(error);
        }
      });
    });
  }

  _retrieveData(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (error, value) => {
        if (error !== null) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    })
  }

  /**
   * 
   * @param {*} arr tableau de clé à supprimer
   */
  async _deleteData(arr) {
    try {
      AsyncStorage.multiRemove(arr);
      return true;
    } catch (err) {
      return err;
    }
  }

  setOAuthToken(v) {
    this.oauth_token = v;
  }

  setOAuthTokenSecret(v) {
    this.oauth_token_secret = v;
  }
}
export default new OAuth();