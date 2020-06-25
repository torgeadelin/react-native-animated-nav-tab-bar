import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { TabBar } from 'react-native-animated-nav-tab-bar'
import Icon from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'

console.log(TabBar)

const Screen = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #f2f2f2;
`

const TabBarIcon = props => {
	return (
		<Icon
			name={props.name}
			size={props.size ? props.size : 24}
			color={props.tintColor}
		/>
	)
}

const Home = props => (
	<Screen>
		<Text>Home</Text>
		<TouchableOpacity onPress={() => props.navigation.navigate('Discover')}>
			<Text>Go to Discover</Text>
		</TouchableOpacity>
	</Screen>
)

const Discover = props => (
	<Screen>
		<Text>Discover</Text>
		<TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
			<Text>Go to Home</Text>
		</TouchableOpacity>
	</Screen>
)

const Images = () => (
	<Screen>
		<Text>Images</Text>
	</Screen>
)

const Profile = () => (
	<Screen>
		<Text>Profile</Text>
	</Screen>
)

// }
import NewTab from './NewTab'

const Tabs = NewTab()

// fixed animation on changing orientation
// fixed animation when provided initial screen

export default () => (
	<Tabs.Navigator
		tabBarOptions={{
			activeTintColor: 'white',
			inactiveTintColor: 'white',
			activeBackgroundColor: 'red',
			inactiveBackgroundColor: 'green', // doesn't make sense for our nav style
		}}
		appearence={{
			topPadding: 20,
			verticalPadding: 20,
			tabBarBackground: 'black',
			//activeTabBackgrounds: ['#ede7e6', '#eae3f6', '#eae4f6'],
			//activeColors: ['#e6b580', '#8e87d6', '#c095c9'],
			// if this is not specified, or not all of them specified, it falls back to
			// tabBarOptions activeTint/activeBg
		}}
		initialRouteName="Profile">
		<Tabs.Screen
			name="Home"
			component={Home}
			options={{
				tabBarIcon: ({ focused, color }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="home"
					/>
				),
			}}
		/>
		<Tabs.Screen
			name="Discover"
			component={Discover}
			options={{
				tabBarVisible: true,
				// you can specify a custon label if you want
				// tabBarLabel: (focused, color) => (
				// 	<Text size={size + 40}>YO</Text>
				// ),
				tabBarIcon: ({ focused, color, size }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						size={size}
						name="search"
					/>
				),
			}}
		/>

		<Tabs.Screen
			name="Images"
			component={Images}
			options={{
				tabBarIcon: ({ focused, color }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="image"
					/>
				),
			}}
		/>
		<Tabs.Screen
			name="Profile"
			component={Profile}
			options={{
				tabBarIcon: ({ focused, color }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="user"
					/>
				),
			}}
		/>
	</Tabs.Navigator>
)

// export default () => (
//   <Tabs.Navigator
//     tabBarOptions={{
//       activeTintColor: '#2F7C6E',
//       inactiveTintColor: '#222222',
//     }}
//     tabBar={props => (
//       <TabBar
//         activeColors={'#2F7C6E'}
//         activeTabBackgrounds={'#DFF7F6'}
//         {...props}
//       />
//     )}>
//     <Tabs.Screen
//       name="Home"
//       component={Home}
//       options={{
//         tabBarIcon: ({focused, color}) => (
//           <TabBarIcon focused={focused} tintColor={color} name="home" />
//         ),
//       }}
//     />
//     <Tabs.Screen
//       name="Discover"
//       component={Discover}
//       options={{
//         tabBarIcon: ({focused, color}) => (
//           <TabBarIcon focused={focused} tintColor={color} name="search" />
//         ),
//       }}
//     />
//     <Tabs.Screen
//       name="Images"
//       component={Images}
//       options={{
//         tabBarIcon: ({focused, color}) => (
//           <TabBarIcon focused={focused} tintColor={color} name="image" />
//         ),
//       }}
//     />
//     <Tabs.Screen
//       name="Profile"
//       component={Profile}
//       options={{
//         tabBarIcon: ({focused, color}) => (
//           <TabBarIcon focused={focused} tintColor={color} name="user" />
//         ),
//       }}
//     />
//   </Tabs.Navigator>
// );
