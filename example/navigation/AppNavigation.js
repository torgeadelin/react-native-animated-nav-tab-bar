import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import styled from "styled-components/native";
import { TabBar } from 'react-native-animated-nav-tab-bar'

const Screen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const TabBarIcon = props => {
  return (
    <Icon
      name={props.name}
      size={props.size ? props.size : 24}
      color={props.focused ? props.tintColor : "#222222"}
    />
  );
};

const Home = () => (
  <Screen>
    <Text>Home</Text>
  </Screen>
);

const Discover = () => (
  <Screen>
    <Text>Discover</Text>
  </Screen>
);

const Images = () => (
  <Screen>
    <Text>Images</Text>
  </Screen>
);

const Profile = () => (
  <Screen>
    <Text>Profile</Text>
  </Screen>
);


// }

const Tabs = createBottomTabNavigator();

export default () => (
  <Tabs.Navigator
  options={{
    tabBarOptions: {
        activeTintColor: "#2F7C6E",
        inactiveTintColor: "#222222",
    },
    tabBarComponent: props => <TabBar
        activeColors={'#2F7C6E'}
        activeTabBackgrounds={'#DFF7F6'}
        {...props}
    />
  }}
  >
    <Tabs.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarIcon focused={focused} tintColor={tintColor} name="home" />
        )
      }}
    />
    <Tabs.Screen
      name="Discover"
      component={Discover}
      options={{
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarIcon focused={focused} tintColor={tintColor} name="search" />
        )
      }}
    />
    <Tabs.Screen
      name="Images"
      component={Images}
      options={{
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarIcon focused={focused} tintColor={tintColor} name="image" />
        )
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarIcon focused={focused} tintColor={tintColor} name="user" />
        )
      }}
    />
  </Tabs.Navigator>
);
