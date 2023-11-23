import { View, Text } from "react-native";
import React from "react";

import AppNavigator from "./apps/navigation/AppNavigator";
import StackNaviagator from "./src/Navigation/StackNaviagator";
import store from "./src/Redux/store";
import { Provider } from "react-redux";
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <StackNaviagator />
    </Provider>
  );
};

export default AppWrapper;
