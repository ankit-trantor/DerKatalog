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

export default class SearchIndex extends Component {


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

    scanBarCode = () => {
        this.setState({ scanning: true, active: false, foundBC: [], receivedBC: null });
    }

    onBarCodeReceived = (receivedBC) => {
        this.setState({scanning : false, receivedBC, loading: true, searchingBC : true}, () => this.queryOneBarCode());
    }

    queryOneBarCode = () => {

        axios.get(`https://api.discogs.com/database/search?per_page=100&type=release&token=${this.discogsToken}&barcode=${this.state.receivedBC}`).then( data => {
            this.setState({foundBC : data.data.results, loading : false, searchingBC: false});
        }).catch( err => console.log(err));
    }

    render() {
        const { scanning, receivedBC, loading, foundBC, searchingBC } = this.state;

        return (
            <Container style={styles.container}>
                <Header>
                    <Body>
                        <Subtitle>Recherche</Subtitle>
                    </Body>
                    <Right />
                </Header>
                {scanning && <BarcodeScan onScanned={this.onBarCodeReceived}/>}
                {!scanning && receivedBC !== null && <Text>{receivedBC}</Text>}

                {loading && <Spinner color="blue" />}

                {!searchingBC && receivedBC !== null && <ListResultBC data={foundBC} /> }




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
