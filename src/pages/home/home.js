import React, { Component } from "react";
import { Button, StyleSheet, Text, View, Linking } from 'react-native';
import { getToken, checkIdentity, oauthUser } from '../../ducks/user';
import _ from "lodash";
import { connect } from 'react-redux';
import DBUtils from '../../lib/dbUtils';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  componentDidUpdate() {
    if (this.props.next === 'checkIdentity') {
      this.props.checkIdentity(this.props.oauth_token, this.props.oauth_token_secret);
    } else if (this.props.next === 'goToLibrary') {
      this.props.navigation.navigate('LibraryHome');
    } else if (this.props.next === 'fromScratch') {      

    }
  }

  componentDidMount() {
    
    DBUtils.upgrade().then(rs => this.props.getToken()).catch(err => {
      console.log(err);
    });
  }

  render() {
    const { oauth_token, oauth_token_secret, error, username, displayAuthButton, next } = this.props;
    return (
      <View style={styles.container}>
        {next === 'fromScratch' &&
          <Button title="S'authentifier dans Discogs" onPress={this._handlePressAuth} />
        }
      </View>
    );
  }


  // https://www.discogs.com/fr/forum/thread/730066
  _handlePressAuth = () => {
    this.props.oauthUser();
  };
}

const mapStateToProps = state => {
  return {
    oauth_token: state.oauth_token,
    oauth_token_secret: state.oauth_token_secret,
    error: state.error,
    username: state.username,
    next: state.next
  };
};

const mapDispatchToProps = {
  getToken,
  checkIdentity,
  oauthUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});