import React, { Component } from "react";

import Home from "./pages/home/home";
import LibraryHome from "./pages/library/library_home/library_home";
import SearchIndex from "./pages/search/index/SearchIndex";
import { createStackNavigator } from "react-navigation";

const RootStack = createStackNavigator({
    Home: Home,
    LibraryHome: LibraryHome,
    SearchIndex: SearchIndex

  }, {
    initialRouteName: "Home",
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
