import * as React from 'react'
import {
	useNavigationBuilder,
	createNavigatorFactory,
	TabRouter,
} from '@react-navigation/native'
import { BottomTabView } from '@react-navigation/bottom-tabs'
import TabBarElement from './TabBarElement'

function BottomTabNavigator({
	initialRouteName,
	backBehavior,
	children,
	screenOptions,
	tabBarOptions,
	appearence,
	...rest
}) {
	const { state, descriptors, navigation } = useNavigationBuilder(TabRouter, {
		initialRouteName,
		backBehavior,
		children,
		screenOptions,
	})

	return (
		<TabBarElement
			{...rest}
			state={state}
			navigation={navigation}
			descriptors={descriptors}
			tabBarOptions={tabBarOptions}
			appearence={appearence}
		/>
	)
}

export default createNavigatorFactory(BottomTabNavigator)
