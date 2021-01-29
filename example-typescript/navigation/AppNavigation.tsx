import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import { AnimatedTabBarNavigator, DotSize, TabElementDisplayOptions } from 'react-native-animated-nav-tab-bar'
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

const TabBarIcon = (props: any) => {
	return (
		<Icon
			name={props.name}
			size={props.size ? props.size : 24}
			color={props.tintColor}
		/>
	)
}

const Home = (props: any) => (
	<Screen>
		<Logo />
		<Text>Home</Text>
		<TouchableOpacity onPress={() => props.navigation.navigate("Discover")}>
			<Text>Go to Discover</Text>
		</TouchableOpacity>
	</Screen>
)

const Discover = (props: any) => (
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
	<Tabs.Navigator initialRouteName="Home"
		tabBarOptions={{
			activeTintColor: "#ffffff",
			inactiveTintColor: "#223322",
			activeBackgroundColor: "red"
		}}
		appearence={{
			shadow: true,
			floating: true,
			whenActiveShow: TabElementDisplayOptions.ICON_ONLY,
			dotSize: DotSize.SMALL
		}}
	>
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
				tabBarIcon: ({ focused, color }) => (
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
