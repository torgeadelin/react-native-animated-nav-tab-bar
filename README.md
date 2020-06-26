[![npm version](https://badge.fury.io/js/react-native-animated-nav-tab-bar.svg)](https://badge.fury.io/js/react-native-animated-nav-tab-bar)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
[![HitCount](https://hits.dwyl.com/{username}/{project-name}.svg)](https://hits.dwyl.com/{username}/{project-name})
![npm](https://img.shields.io/npm/dw/react-native-animated-nav-tab-bar.svg)

# react-native-animated-nav-tab-bar
<div style="display: flex; flex-direction: row; justyfy-content: flex-start;">
  <img src="https://i.imgur.com/IfQh9UQ.png" width="150" height="150"/>
  <p>A simple and customisable React Native component that implements an animated bottom tab bar for React Navigation v5.</p>
 </div>

- 60FPS
- Support for iPhoneX
- Lots of customisation
- Bottom Tab Bar Floating style

## 📆 Updates / Changelog

- *April 19 2020*
  - In order to run the examples, don't forget to `pod install` after `npm install`
  - Glitch when using navigation.navigate() has been fixed!
- *March 11 2020*
  - The package v2.01 now works with React Navigation 5. If you're still using a previous version of React Navigation, please use v1 of this package.
- *June 25 2020*
  - Upgrade to v3.0
  - Add more customisations including, floating style, icon configs, label configs, and more.
  - Fixed issues with changing screen orientation
  - Fixed animation when provided initial screen
  - Improved code quality, refactoring
  - Implement a new [custom navigation](https://reactnavigation.org/docs/custom-navigators) builder 


## Animation Preview
<img src="https://i.imgur.com/lRG92ds.gif" width="300">

## Customisation Preview
<div style="display:flex;">
<img src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/glitch-fix-refactor/demo1.png?raw=true" width="300">
<img src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/glitch-fix-refactor/demo2.png?raw=true" width="300">
<img src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/glitch-fix-refactor/demo3.png?raw=true" width="300">
</div>

## Other possible Customisations

### Tab Bar Icons
<div style="display:flex;">
<img style="margin-right: 10px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/glitch-fix-refactor/config6.png?raw=true" width="300px" height="135">
<img style="margin-right: 10px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/glitch-fix-refactor/config7.png?raw=true" width="300px" height="135">
<img style="margin-right: 10px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/glitch-fix-refactor/config8.png?raw=true" width="300px" height="135">
</div>

### Layout
<div style="display:flex; justify-content: space-between; align-items: center;">  
<img style="margin-right: 10px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/glitch-fix-refactor/config1.png?raw=true" width="300px" height="220">
<img style="margin-right: 10px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/glitch-fix-refactor/config2.png?raw=true" width="300px" height="220">
<img style="margin-right: 10px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/glitch-fix-refactor/config3.png?raw=true" width="300px" height="220">
</div>
<br/>
<div style="display:flex;">
<img style="margin-right: 10px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/glitch-fix-refactor/config4.png?raw=true" width="300" height="220">
<img style="margin-right: 10px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/glitch-fix-refactor/config5.png?raw=true" width="300" height="220">
</div>


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

export default () =>
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: "#2F7C6E",
      inactiveTintColor: "#222222"
    }}
    tabBar={props => (
      <TabBar
        activeColors={"#2F7C6E"}
        activeTabBackgrounds={"#DFF7F6"}
        {...props}
      />
    )}
  >
    <Tabs.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="Home"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }}
    />
    </Tabs.Navigator>
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
