import React, {Component} from 'react';
import { Camera, Permissions} from 'expo';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class BarcodeScan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qrcode: '',
            hasCameraPermission: null,
            type: Camera.Constants.Type.back
        }
    }

    async componentWillMount() {
        let status = 'unknown';
        try {
            const plop = await Permissions.askAsync(Permissions.CAMERA);
            status = plop.status;
        } catch (err) {}
        
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    onBarCodeRead = (e) => this.setState({qrcode: e.data}, ()=> console.log(this.state.qrcode));

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
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 0.1,
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      this.setState({
                        type: this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                      });
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                      {' '}Flip{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Camera>
            </View>
          );
        }
    }
}
