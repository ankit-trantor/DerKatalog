import React, { Component } from "react";
import { Button, StyleSheet, Text, View, Linking } from 'react-native';
import LibraryHome from '../library/library_home/library_home';

import OAuth from '../../lib/oauth';
import { getDate } from '../../ducks/user';
import _ from "lodash";
import moment from 'moment';
import { connect } from 'react-redux';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          oauth_token: null,
          oauth_token_secret: null
        };
    }

    /**
     * {(oauth_token === null || oauth_token_secret === null) &&
          <Button title="S'authentifier dans Discogs" onPress={this._handlePressAsync} />
        }
     */

     
  render() {
    const {oauth_token, oauth_token_secret} = this.state;
    const {date} = this.props;
    return (
      <View style={styles.container}>

          <Button title="S'authentifier dans Discogs" onPress={this._handlePressAsync} />

        <Text>{date.format('DD/MM/YYYY HH:mm:ss')}</Text>
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
    //OAuth.authentication().then(() => this.verifyUserIdentity()).catch(err => console.log(err));
    this.props.getDate();

  
  };
}

const mapStateToProps = state => {
  return {
    date: state.date
  };
};

const mapDispatchToProps = {
  getDate
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});