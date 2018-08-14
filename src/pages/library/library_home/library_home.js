import React, { Component } from "react";
import {
    Container,
    Header,
    Title,
    Fab,
    Button,
    IconNB,
    Left,
    Right,
    Body,
    Icon,
    View
} from "native-base";


export default class LibraryHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: "#5067FF" }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}
                >
                    <IconNB name="md-add" />
                    <Button style={{ backgroundColor: "#34A34F" }}>
                        <IconNB name="md-barcode" />
                    </Button>
                    <Button style={{ backgroundColor: "#3B5998" }}>
                        <IconNB name="md-create" />
                    </Button>
                </Fab>
            </View>
        );
    }
}