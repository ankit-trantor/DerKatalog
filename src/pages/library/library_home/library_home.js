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
    Subtitle,
    Text,
    Title,
    View
} from "native-base";
import React, { Component } from "react";

import BarcodeScan from '../../scanner/scanner';
import styles from "./styles";

export default class LibraryHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            scanning: false
        };
    }

    scanBarCode = () => {
        this.setState({ scanning: true, active: false });
    }

    render() {
        const { scanning } = this.state;

        return (
            <Container style={styles.container}>
                <Header>
                    <Body>
                        <Subtitle>{scanning ? "Sannez le code-barre" : "HP"}</Subtitle>
                    </Body>
                    <Right />
                </Header>
                {scanning && <BarcodeScan />}

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
