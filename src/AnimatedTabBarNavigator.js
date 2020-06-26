import * as React from "react";
import {
  useNavigationBuilder,
  createNavigatorFactory,
  TabRouter,
} from "@react-navigation/native";
import TabBarElement from "./TabBarElement";

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

  const defaultAppearence = {
    topPadding: 20,
    horizontalPadding: 20,
    tabBarBackground: "#FFFFFF",
    floating: false,
    dotCornerRadius: 100,
    whenActiveShow: "both",
    whenInactiveShow: "icon-only",
    shadow: true,
    dotSize: 100,
  };

  return (
    <TabBarElement
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
      tabBarOptions={tabBarOptions}
      appearence={{ ...defaultAppearence, ...appearence }}
    />
  );
}

TabBarElement.defaultProps = {
  appearence: {
    topPadding: 20,
    horizontalPadding: 20,
    tabBarBackground: "#FFFFFF",
    floating: false,
    dotCornerRadius: 100,
    whenActiveShow: "both",
    whenInactiveShow: "icon-only",
    shadow: true,
    dotSize: 100,
  },
};

export default createNavigatorFactory(BottomTabNavigator);
