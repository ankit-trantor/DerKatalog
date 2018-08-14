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

import BarcodeScan from '../../scanner/scanner';
import _ from 'lodash';
import {default as axios} from 'axios';
import styles from "./styles";

export default class LibraryHome extends Component {


    constructor(props) {
        super(props);

        this.discogsToken = "bDqfoQaQSUPIVzwXqWJwnSmaOIHyyDUeWwwEanJF";
        this.state = {
            active: false,
            scanning: false,
            loading: false,
            receivedBC: null,
            searchingForRelease: false,
            foundReleases: []
        };
    }

    scanBarCode = () => {
        this.setState({ scanning: true, active: false, foundReleases: [], receivedBC: null });
    }

    onBarCodeReceived = (receivedBC) => {
        this.setState({scanning : false, receivedBC, loading: true, searchingForRelease : true}, () => this.queryOneBarCode());
    }

    queryOneBarCode = () => {

        axios.get(`https://api.discogs.com/database/search?per_page=100&type=release&token=${this.discogsToken}&barcode=${this.state.receivedBC}`).then( data => {
            this.setState({foundReleases : data.data.results, loading : false, searchingForRelease: false});
        }).catch( err => console.log(err));
    }

    render() {
        const { scanning, receivedBC, loading, foundReleases, searchingForRelease } = this.state;

        return (
            <Container style={styles.container}>
                <Header>
                    <Body>
                        <Subtitle>{scanning ? "Scannez le code-barre" : "HP"}</Subtitle>
                    </Body>
                    <Right />
                </Header>
                {scanning && <BarcodeScan onScanned={this.onBarCodeReceived}/>}
                {!scanning && receivedBC !== null && <Text>{receivedBC}</Text>}

                {loading && <Spinner color="blue" />}

                {!searchingForRelease && receivedBC !== null && <Text>{foundReleases.length > 0 ? foundReleases[0].id : "Pas de résultats"}</Text> }




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
                        <IconNB name="md-create" />
                    </Button>
                </Fab>

            </Container>

        );
    }
}
