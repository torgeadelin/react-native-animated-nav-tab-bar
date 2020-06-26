import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar'
import Icon from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'

const Tabs = AnimatedTabBarNavigator()

const Screen = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #f2f2f2;
`

const Logo = () => (
	<Image
		source={require('./logo.png')}
		resizeMode={'cover'}
		style={{ width: 150, height: 150 }}
	/>
)

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
		<Logo />
		<Text>Home</Text>
		<TouchableOpacity onPress={() => props.navigation.navigate('Discover')}>
			<Text>Go to Discover</Text>
		</TouchableOpacity>
	</Screen>
)

const Discover = props => (
	<Screen>
		<Logo />
		<Text>Discover</Text>
		<TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
			<Text>Go to Home</Text>
		</TouchableOpacity>
	</Screen>
)

const Images = () => (
	<Screen>
		<Logo />
		<Text>Images</Text>
	</Screen>
)

const Profile = () => (
	<Screen>
		<Logo />
		<Text>Profile</Text>
	</Screen>
)

export default () => (
	<Tabs.Navigator
		tabBarOptions={{
			activeTintColor: 'black',
			inactiveTintColor: 'black',
			activeBackgroundColor: '#FFCF64',
			tabStyle: {
				paddingBottom: 10,
			},
			labelSt,
		}}
		appearence={{
			topPadding: 10,
			verticalPadding: 10,
			tabBarBackground: 'white',
			floating: true,

			// 	// activeTabBackgrounds: ['#ede7e6', '#eae3f6', '#eae4f6'],
			// 	// activeColors: ['#e6b580', '#8e87d6', '#c095c9'],
			// 	// if this is not specified, or not all of them specified, it falls back to
			// 	// tabBarOptions activeTint/activeBg
		}}
		initialRouteName="Home">
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
				tabBarIcon: ({ focused, color, size }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
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
