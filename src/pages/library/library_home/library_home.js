import {
    Body,
    Button,
    Container,
    Fab,
    Header,
    IconNB,
    Right,
    Subtitle
} from "native-base";
import React, { Component } from "react";

import styles from "./styles";

export default class LibraryHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Body>
                        <Subtitle>Der Katalog</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: "#5067FF" }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}
                >
                    <IconNB name="md-add" />
                    <Button style={{ backgroundColor: "#34A34F" }} onPress={() => this.props.navigation.navigate("SearchIndex")}>
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
