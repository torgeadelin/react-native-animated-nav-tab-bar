import * as React from "react";
import {
  useNavigationBuilder,
  createNavigatorFactory,
  TabRouter,
} from "@react-navigation/native";
import TabBarElement from "./TabBarElement";
import { DotSize, IAppearenceOptions, TabButtonLayout, TabElementDisplayOptions } from './types';

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

interface IBottomTabNavigatorProps {
  initialRouteName?: string;
  backBehavior?: "history" | "initialRoute" | "order" | "none" | undefined;
  children: React.ReactNode;
  screenOptions?: any;
  tabBarOptions?: any;
  appearence: Partial<IAppearenceOptions>;  
}

const BottomTabNavigator = ({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  tabBarOptions,
  appearence,
  ...rest
}: IBottomTabNavigatorProps) => {
  
  const { state, descriptors, navigation } = useNavigationBuilder(TabRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
  });

  const finalAppearence: IAppearenceOptions = {
    ...defaultAppearence,
    ...appearence
  }

  const finalTabBarOptions = {
    ...defaultTabBarOptions,
    ...tabBarOptions
  }

  return (
    <TabBarElement
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
      tabBarOptions={finalTabBarOptions}
      appearence={finalAppearence}
    />
  );
}

BottomTabNavigator.defaultProps = {
  lazy: true,
};

export default createNavigatorFactory(BottomTabNavigator);
