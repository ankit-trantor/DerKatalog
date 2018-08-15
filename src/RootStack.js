import React, { Component } from "react";

import LibraryHome from "./pages/library/library_home/library_home";
import SearchIndex from "./pages/search/index/SearchIndex";
import { createStackNavigator } from "react-navigation";

const RootStack = createStackNavigator({
    LibraryHome: LibraryHome,
    SearchIndex: SearchIndex
  }, {
    initialRouteName: "LibraryHome"
  });
export default RootStack;
