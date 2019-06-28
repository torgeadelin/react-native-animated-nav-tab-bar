[![npm version](https://badge.fury.io/js/react-native-animated-nav-tab-bar.svg)](https://badge.fury.io/js/react-native-animated-nav-tab-bar)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
[![HitCount](http://hits.dwyl.com/{username}/{project-name}.svg)](http://hits.dwyl.com/{username}/{project-name})

# react-native-animated-nav-tab-bar
A simple and customisable  React Native component that implements an animated bottom tab bar for React Navigation.

## Instalation
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
import { TabBar } from 'react-native-animated-nav-tab-bar'
```
Simply place a <TabBar /> tag in the tabBarComponent in the configuration option object of the navigation function

```javascript
...
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
```

## Documentation
### TabBar Component

| Name                | Description                                                        | Default | Type   |
|---------------------|--------------------------------------------------------------------|---------|--------|
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

