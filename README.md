[![npm version](https://badge.fury.io/js/react-native-animated-nav-tab-bar.svg)](https://badge.fury.io/js/react-native-animated-nav-tab-bar)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
[![HitCount](https://hits.dwyl.com/{username}/{project-name}.svg)](https://hits.dwyl.com/{username}/{project-name})
![npm](https://img.shields.io/npm/dw/react-native-animated-nav-tab-bar.svg)

# react-native-animated-nav-tab-bar

A simple and customisable React Native component that implements an animated bottom tab bar for React Navigation.

- Support for iPhoneX

## Preview

<img src="https://i.imgur.com/lRG92ds.gif" width="300">

## Prerequisites

❗️In order to use the component, you need to have [React Navigation](https://reactnavigation.org/) installed

## Installation

If using yarn

```
yarn add react-native-animated-nav-tab-bar
```

If using npm

```
npm install react-native-animated-nav-tab-bar
```

## Usage

```javascript
import { TabBar } from "react-native-animated-nav-tab-bar";
```

Simply place a `<TabBar />` tag in the `tabBar` in the configuration option object of the navigation function

```javascript
...

const Tabs = createBottomTabNavigator();

export default () => (
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: "#2F7C6E",
      inactiveTintColor: "#222222"
    }}
    tabBar={props => (
      <TabBar
                activeColors={['#e6b580', '#8e87d6', '#c095c9']} // or activeColors={'#e6b580'}
                activeTabBackgrounds={['#ede7e6', '#eae3f6', '#eae4f6']} // or activeTabBackgrounds={'#ede7e6'}
                {...props}
        {...props}
      />
    )}
  >
  </Tabs.Navigator>
```

Add icons to your Bottom Navigation
To use this, you need [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

Example

```javascript
import Icon from 'react-native-vector-icons/Feather';
...

const HomeStack = createStackNavigator({
    Home: () => <View style={{flex:1 }}><Text>Home</Text></View>
})

HomeStack.navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) =>
        <Icon
            name={props.name}
            size={props.size ? props.size : 24}
            color={props.focused ? props.tintColor : "#222222"}
            focused={focused}
            tintColor={tintColor}
            name="home"
        />,
}
...
```

## Documentation

### TabBar Component

| Name                | Description                                                        | Default | Type   |
| ------------------- | ------------------------------------------------------------------ | ------- | ------ |
| activeTabBackground | Color of active tab backgorund                                     | #E4F7F7 | String |
| tabBarBackground    | Backgorund color for the wrapper that contains the navigation tabs | #FFFFFF | String |
| shadow              | If set to true, the wrapper has a light shadow                     | true    | Bool   |
| verticalPadding     | Vertical space between for the tab buttons                         | 10      | Number |
| topPadding          | Space between the tab button and the wrapper (top)                 | 10      | Number |

## Contributing

Pull requests are always welcome! Feel free to open a new GitHub issue for any changes that can be made.

**Working on your first Pull Request?** You can learn how from this free series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## Author

Catalin Torge [@torgeadelin](https://twitter.com/torgeadelin)

## License

[MIT](https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/master/LICENSE)
