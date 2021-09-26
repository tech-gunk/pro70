import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import WriteStoryScreen from "./screens/WriteStoryScreen";
import ReadStoryScreen from "./screens/ReadStoryScreen";

import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "./screens/LoginScreen";
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

var TabNavigator = createBottomTabNavigator(
  {
    ReadStory: { screen: ReadStoryScreen },
    WriteStory: { screen: WriteStoryScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        console.log(routeName);
        if (routeName === "ReadStory") {
          return <Ionicons name="laptop" size={32} color="#2F3337" />;
        } else if (routeName === "WriteStory") {
          return <Ionicons name="barcode" size={32} color="#2F3337" />;
        }
      },
    }),
  }
);
const switchNavigator = createSwitchNavigator({
  LoginScreen: { screen: LoginScreen },
  TabNavigator: { screen: TabNavigator },
});

const AppContainer = createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
