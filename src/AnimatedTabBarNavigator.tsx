import * as React from "react";
import {
  useNavigationBuilder,
  createNavigatorFactory,
  TabRouter,
} from "@react-navigation/native";
import TabBarElement, { DotSize, IAppearenceOptions, TabButtonLayout, TabElementDisplayOptions } from "./TabBarElement";

const defaultAppearence: IAppearenceOptions = {
  topPadding: 10,
  bottomPadding: 10,
  horizontalPadding: 10,
  tabBarBackground: "#FFFFFF",
  floating: false,
  dotCornerRadius: 100,
  whenActiveShow: TabElementDisplayOptions.BOTH,
  whenInactiveShow: TabElementDisplayOptions.ICON_ONLY,
  shadow: false,
  dotSize: DotSize.DEFAULT,
  tabButtonLayout: TabButtonLayout.HORIZONTAL,
  activeColors: undefined,
  activeTabBackgrounds: undefined,
};

const defaultTabBarOptions = {
  activeTintColor: "black",
  inactiveTintColor: "black",
  activeBackgroundColor: "#FFCF64",
  labelStyle: {
    fontWeight: "bold",
  },
};

const BottomTabNavigator = ({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  tabBarOptions,
  appearence,
  ...rest
}) => {
  
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

BottomTabNavigator.defaultProps = {
  lazy: true,
};

export default createNavigatorFactory(BottomTabNavigator);
