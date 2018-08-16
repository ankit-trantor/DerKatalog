import * as Expo from "expo";

import React, { Component } from "react";

import RootStack from "./src/RootStack";
import { StyleProvider, View } from "native-base";
import getTheme from "./src/theme/components";
import variables from "./src/theme/variables/commonColor";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  componentWillMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <StyleProvider style={getTheme(variables)}>
      <View style={{flex: 1}}>
        <RootStack />
      </View>
      </StyleProvider>
    );
  }
}