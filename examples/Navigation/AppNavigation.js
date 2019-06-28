import { createStackNavigator, createAppContainer } from 'react-navigation'
import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native'
import { TabBar } from 'react-native-animated-tab-bar'

const Screen = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #F2F2F2;
`

const TabBarIcon = (props) => {
    return (
        <Icon
            name={props.name}
            size={props.size ? props.size : 24}
            color={props.focused ? props.tintColor : "#222222"}

        />
    )
}

const HomeStack = createStackNavigator({
    Home: () => <Screen><Text>Home</Text></Screen>
})

const DiscoverStack = createStackNavigator({
    Discover: () => <Screen><Text>Discover</Text></Screen>
})

const ImagesStack = createStackNavigator({
    Images: () => <Screen><Text>Images</Text></Screen>
})

const ProfileStack = createStackNavigator({
    Profile: () => <Screen><Text>Profile</Text></Screen>
})

HomeStack.navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) =>
        <TabBarIcon
            name={props.name}
            size={props.size ? props.size : 24}
            color={props.focused ? props.tintColor : "#222222"}
            focused={focused}
            tintColor={tintColor}
            name="home"
        />,
}

DiscoverStack.navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => <TabBarIcon focused={focused} tintColor={tintColor} name="search" />,
}

ImagesStack.navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => <TabBarIcon focused={focused} tintColor={tintColor} name="image" />,
}

ProfileStack.navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => <TabBarIcon focused={focused} tintColor={tintColor} name="user" />,
}


export default createAppContainer(
    createBottomTabNavigator(
        {
            Home: HomeStack,
            Discover: DiscoverStack,
            Images: ImagesStack,
            Profie: ProfileStack,

        }, {
            tabBarOptions: {
                activeTintColor: "#2B7C85",
                inactiveTintColor: "#222222",
            },

            tabBarComponent: props => <TabBar
                {...props}
            />,
        }
    )
)


