import { Camera, Permissions } from "expo";
import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import PropTypes from "prop-types";

export default class BarcodeScan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qrcode: "",
            hasCameraPermission: null,
            type: Camera.Constants.Type.back
        }
    }

    async componentWillMount() {
        let status = "unknown";
        try {
            const plop = await Permissions.askAsync(Permissions.CAMERA);
            status = plop.status;
        } catch (err) {}
        this.setState({ hasCameraPermission: status === "granted" });
    }

    onBarCodeRead = (e) => this.props.onScanned(e.data);

    render () {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
            <View style={{ flex: 1 }}>
              <Camera 
                style={{ flex: 1 }}
                type={this.state.type}
                onBarCodeRead={this.onBarCodeRead}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "transparent",
                    flexDirection: "row",
                  }}
                />
              </Camera>
            </View>
          );
        }
    }
}

BarcodeScan.propTypes = {
  onScanned: PropTypes.func.isRequired
};
