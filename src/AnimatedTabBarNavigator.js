import * as React from "react";
import {
  useNavigationBuilder,
  createNavigatorFactory,
  TabRouter,
} from "@react-navigation/native";
import TabBarElement from "./TabBarElement";

const defaultAppearence = {
  topPadding: 10,
  bottomPadding: 10,
  horizontalPadding: 10,
  tabBarBackground: "#FFFFFF",
  floating: false,
  dotCornerRadius: 100,
  whenActiveShow: "both",
  whenInactiveShow: "icon-only",
  shadow: false,
  dotSize: 100,
};

const defaultTabBarOptions = {
  activeTintColor: "black",
  inactiveTintColor: "black",
  activeBackgroundColor: "#FFCF64",
  labelStyle: {
    fontWeight: "bold",
  },
};

function BottomTabNavigator({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  tabBarOptions,
  appearence,
  ...rest
}) {
  const { state, descriptors, navigation } = useNavigationBuilder(TabRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
  });

  return (
    <TabBarElement
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
      tabBarOptions={{ ...defaultTabBarOptions, ...tabBarOptions }}
      appearence={{ ...defaultAppearence, ...appearence }}
    />
  );
}

TabBarElement.defaultProps = {
  appearence: {
    ...defaultAppearence,
  },
  tabBarOptions: {
    ...defaultTabBarOptions,
  },
};

BottomTabNavigator.defaultProps = {
  lazy: true,
};

export default createNavigatorFactory(BottomTabNavigator);
