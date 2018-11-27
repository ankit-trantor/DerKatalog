import {
    Body,
    Button,
    Container,
    Fab,
    Header,
    IconNB,
    Right,
    Subtitle,
    Content,
    View
} from "native-base";
import React, { Component } from "react";
import styles from "./styles";
import { getToken } from '../../../ducks/user';
import { connect } from 'react-redux';

class LibraryHome extends Component {

    static navigationOptions = {
        title: 'Der Katalog',
    };

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    componentDidMount() {
        this.props.getToken();
    }

    render() {
        return (
            <Container style={styles.container}>                
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: "#5067FF" }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}
                >
                    <IconNB name="md-add" />
                    <Button style={{ backgroundColor: "#34A34F" }} onPress={() => this.props.navigation.navigate("SearchIndex", { launchScanner : true})}>
                        <IconNB name="md-barcode" />
                    </Button>
                    <Button style={{ backgroundColor: "#3B5998" }} disabled>
                        <IconNB name="md-search" />
                    </Button>
                </Fab>
            </Container>

        );
    }
}

const mapStateToProps = state => {
    return {
      oauth_token: state.oauth_token,
      oauth_token_secret: state.oauth_token_secret,
      error: state.error
    };
  };
  
  const mapDispatchToProps = {
    getToken
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(LibraryHome);
  
  
