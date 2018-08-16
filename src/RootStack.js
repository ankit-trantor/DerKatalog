import React, { Component } from "react";

import LibraryHome from "./pages/library/library_home/library_home";
import SearchIndex from "./pages/search/index/SearchIndex";
import { createStackNavigator } from "react-navigation";

const RootStack = createStackNavigator({
    LibraryHome: LibraryHome,
    SearchIndex: SearchIndex
  }, {
    initialRouteName: "LibraryHome",
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  });
export default RootStack;
