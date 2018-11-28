import {
    Body,
    Button,
    Container,
    Content,
    Fab,
    Header,
    Icon,
    IconNB,
    Left,
    Right,
    Spinner,
    Subtitle,
    Text,
    Title,
    View
} from "native-base";
import React, { Component } from "react";

import BarcodeScan from "../../scanner/scanner";
import ListResultBC from "../../search/bc_list/ListResultBC";
import _ from "lodash";
import {default as axios} from "axios";
import styles from "./styles";
import { getToken } from '../../../ducks/user';
import { connect } from 'react-redux';
import OAuth from '../../../lib/oauth';

class SearchIndex extends Component {

    // https://reactnavigation.org/docs/en/headers.html

    static navigationOptions = ({navigation}) => {
        return {
            title: `Recherche ${navigation.getParam("launchScanner") === true ? "- Code Barre" : ""}`
        }
    };

    constructor(props) {
        super(props);

        this.discogsToken = "bDqfoQaQSUPIVzwXqWJwnSmaOIHyyDUeWwwEanJF";
        this.state = {
            active: false,
            scanning: false,
            loading: false,
            receivedBC: null,
            searchingBC: false,
            foundBC: []
        };
    }


    componentDidMount() {
        const {navigation} = this.props;
        if (navigation.getParam('launchScanner') === true) {
            this.scanBarCode();
        }
    }

    componentDidUpdate() {
        if (this.props.next === 'checkIdentity') {
          this.props.checkIdentity(this.props.oauth_token, this.props.oauth_token_secret);
        }
      }


    scanBarCode = () => {
        this.setState({ scanning: true, active: false, foundBC: [], receivedBC: null });
    }

    onBarCodeReceived = (receivedBC) => {
        this.setState({scanning : false, receivedBC, loading: true, searchingBC : true}, () => this.queryOneBarCode());
    }

    queryOneBarCode = () => {
        OAuth.getRequest(`https://api.discogs.com/database/search?per_page=100&type=release&barcode=${this.state.receivedBC}`, this.props.oauth_token, this.props.oauth_token_secret).then( data => {
            this.setState({foundBC : data.data.results, loading : false, searchingBC: false});
        }).catch( err => console.log(err));
    }

    render() {
        const { scanning, receivedBC, loading, foundBC, searchingBC } = this.state;

        return (
            <Container style={styles.container}>
                {scanning && <BarcodeScan onScanned={this.onBarCodeReceived}/>}
                {!scanning && receivedBC !== null && <Text>{receivedBC}</Text>}

                {loading && <Spinner color="blue" />}

                {!searchingBC && receivedBC !== null && <ListResultBC data={_.map(foundBC, e => { e.key = _.toString(e.id); return e;})} /> }




                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: "#5067FF" }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}
                >
                    <IconNB name="md-add" />
                    <Button style={{ backgroundColor: "#34A34F" }} onPress={this.scanBarCode}>
                        <IconNB name="md-barcode" />
                    </Button>
                    <Button style={{ backgroundColor: "#3B5998" }}>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchIndex);
