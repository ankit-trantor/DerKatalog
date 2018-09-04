import React, { Component } from "react";
import { Button, StyleSheet, Text, View, Linking } from 'react-native';
import LibraryHome from '../library/library_home/library_home';

import OAuth from '../../lib/oauth';
import _ from "lodash";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          oauth_token: null,
          oauth_token_secret: null
        };
    }

  render() {
    const {oauth_token, oauth_token_secret} = this.state;
    return (
      <View style={styles.container}>
        {(oauth_token === null || oauth_token_secret === null) &&
          <Button title="S'authentifier dans Discogs" onPress={this._handlePressAsync} />
        }
      </View>
    );
  }

  componentDidMount() {
    this.handleModifToken(true);
  }

  handleModifToken(init) {
    OAuth.promiseLectureToken.then(arr => {
      _.forEach(arr, e => {
        if (e[0] === 'oauth_token_secret') {
          OAuth.setOAuthTokenSecret(e[1]);
        } else if (e[0] === 'oauth_token') {
          OAuth.setOAuthToken(e[1]);
        }
      });

      this.setState({oauth_token : OAuth.oauth_token, oauth_token_secret: OAuth.oauth_token_secret}, () => {
        if (init) {
          if (this.state.oauth_token !== null && this.state.oauth_token_secret !== null) {
            this.verifyUserIdentity();
          }
        }
      });
      
    });
  }

  verifyUserIdentity() {
    OAuth.checkIdentity()
      .then(data => {
        return OAuth.getUserInformation(data.data.username);
      }).then(data => {
        this.handleModifToken(false);
      }).catch(err => {
        this.setState({oauth_token : null, oauth_token_secret: null});
        OAuth._deleteData(["oauth_token", "oauth_token_secret"]);
      });
  }


  // https://www.discogs.com/fr/forum/thread/730066
  _handlePressAsync = () => {
    OAuth.authentication().then(() => this.verifyUserIdentity()).catch(err => console.log(err));
  
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});