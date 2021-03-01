[![npm version](https://badge.fury.io/js/react-native-animated-nav-tab-bar.svg)](https://badge.fury.io/js/react-native-animated-nav-tab-bar)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
[![HitCount](https://hits.dwyl.com/{username}/{project-name}.svg)](https://hits.dwyl.com/{username}/{project-name})
![npm](https://img.shields.io/npm/dw/react-native-animated-nav-tab-bar.svg)

# react-native-animated-nav-tab-bar

<img src="https://i.imgur.com/IfQh9UQ.png" width="150" height="150"/>
<p>A simple and customizable React Native component that implements an animated bottom tab bar for React Navigation v5.</p>

- 60FPS
- Support for iPhoneX
- Lots of customization
- Bottom Tab Bar Floating style

## 📆 Updates / Changelog
[Changelog.md](Changelog.md)

## Animation Preview

<img src="https://i.imgur.com/lRG92ds.gif" width="300">

## Customization Preview

<div style="display:flex;">config1.png
<img src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/master/demo_images/demo1.png?raw=true" width="300">
<img src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/master/demo_images//demo2.png?raw=true" width="300">
<img src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/master/demo_images/demo3.png?raw=true" width="300">
</div>

## Other possible Customizations

### Tab Bar Icons

<div style="display:flex;">
<img style="margin-right: 30px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/master/demo_images/config6.png?raw=true" width="300px" height="135">
<img style="margin-right: 30px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/master/demo_images/config7.png?raw=true" width="300px" height="135">
<img style="margin-right: 30px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/master/demo_images/config8.png?raw=true" width="300px" height="135">
</div>

### Layout

<div style="display:flex; justify-content: space-between; align-items: center;">  
<img style="margin-right: 30px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/master/demo_images/config1.png?raw=true" width="300px" height="220">
<img style="margin-right: 30px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/master/demo_images/config2.png?raw=true" width="300px" height="220">
<img style="margin-right: 30px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/master/demo_images/config3.png?raw=true" width="300px" height="220">
</div>

<div style="margin-top: 30px; display:flex;">
<img style="margin-right: 30px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/master/demo_images/config4.png?raw=true" width="300" height="220">
<img style="margin-right: 30px" src="https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/master/demo_images/config5.png?raw=true" width="300" height="220">
</div>

### Let's get to know you!

👋 If your app is deployed to AppStore/GooglePlay and you're using this package, send me a DM on Twitter [@torgeadelin](https://twitter.com/torgeadelin)

## Prerequisites

❗️In order to use the component, you need to have [React Navigation](https://reactnavigation.org/) v5 installed.

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

#### Notice

If you updated the package to a new version, don't forget to run `npm run start -- --reset-cache` to have the latest version.

#### Import

```javascript
// Javascript
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
// Typescript
import {
  AnimatedTabBarNavigator,
  DotSize, // optional
  TabElementDisplayOptions, // optional
  TabButtonLayout, // optional
  IAppearanceOptions // optional
} from 'react-native-animated-nav-tab-bar'

```

#### Initialize

Then create a navigator using the navigation builder that you imported, and create your navigation! Look at the example below.

```javascript
...

const Tabs = AnimatedTabBarNavigator();

export default () => (
  <Tabs.Navigator
    // default configuration from React Navigation
    tabBarOptions={{
      activeTintColor: "#2F7C6E",
      inactiveTintColor: "#222222"
    }}
  >

    // Home Screen
    <Tabs.Screen name="Home" component={Home} />

    // Other screens go here.
    ...

  </Tabs.Navigator>
)
```

#### Add Icons

If you'd like to add icons to your Bottom Navigation
you can use [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons). Look at an example of how to add icons to your tab bar.

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

The navigation component takes two main props which help you customize your navigation. `tabBarOptions` is the default prop from React Navigation which you can use to specify different tint colors and more (see available options below). for all the details. The second prop is `appearance`. Here you'll be able to adjust several properties of the tab bar as you wish. See the available properties above.

- **tabBarOptions**

  - ✅`activeTintColor` - Label and icon color of the active tab item.
  - ✅`inactiveTintColor` - Label and icon color of the inactive tab item.
  - ✅`activeBackgroundColor` - Background color of the active tab item.
  - ✅`tabStyle` - Style object for the tab wrapper (**Note!** it overrides the properties in `appearance` prop (see below).
  - ✅`labelStyle` - Style object for the tab label text.

- **appearance**

  - ✅`topPadding` (default: 20) - Space between the tab button and the wrapper (top)
  - ✅`horizontalPadding` (default: 20) - Vertical space between for the tab buttons
  - ✅`tabBarBackground` (default: "white") - Background color for the wrapper that contains the navigation tabs
  - ✅`shadow` (default: true) - If set to true, the wrapper has a light shadow

  - ✅`activeTabBackgrounds` - Array of hex colours for the background of each tab when active. (if not specified, falls back to the `activeBackgroundColor` from `tabBarOptions`)
  - ✅`activeColors` - Array of hex colours for the tint of each tab when active. (if not specified, falls back to the `activeTintColor` from `tabBarOptions`)

  - ✅`floating` (default: false) - If set to true, the nav bar will float on top of the current screen. Look at examples above.
  - ✅`whenActiveShow` (default: "both") Configure the appearance of the active tab. Available values `both`, `label-only`, `icon-only`.
  - ✅`whenInactiveShow` (default: "icon-only") Configure the appearance of the inactive tabs. Available values `both`, `label-only`, `icon-only`.
  - ✅`tabButtonLayout` (default: "horizontal") Configure the layout of the tab button. Available values `vertical`, `horizontal`.

  - ✅`dotCornerRadius` (default: 100) Corner radius for the active background / dot.
  - ✅`dotSize` (default: "medium") Size of dot for the active tab. Available values `small`, `medium`, `large`.

  **Note! Make sure you reload your view after changing the props. The animation might be stuck while changing them dynamically.**

## Troubleshooting

- _My tab doesn't reflect the `tabStyle` object when I set `paddingTop`._ **Solution**: You must provide the same value for `paddingTop` in both `tabStyle` object and `topPadding` property from `appearance`. This is due to the fact that the dot / active background uses position absolute, and the parent's padding top does not affect it.
- _My appearance prop style doesn't apply._ **Solution**: Up until version 3.1.2 there was a typo with the appearance prop. (Instead of appearance it was appearence). It has been fixed in 3.1.3 and you should make sure you're using the right spelling too if you update to 3.1.3. 

## Contributing

Pull requests are always welcome! Feel free to open a new GitHub issue for any changes that can be made.

If you raise an issue, please add proper steps to reproduce it and proper logs. Thanks!

**Working on your first Pull Request?** You can learn how from this free series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## Author

Catalin Torge [@torgeadelin](https://twitter.com/torgeadelin)

## License

[MIT](https://github.com/torgeadelin/react-native-animated-nav-tab-bar/blob/master/LICENSE)
