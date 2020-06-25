import React from 'react'

// UI Components imports
import { Text, Animated, BackHandler, View, Dimensions } from 'react-native'
import {
	TabButton,
	BottomTabBarWrapper,
	Dot,
	Label,
	ScreenWrapper,
	SHADOW,
} from './UIComponents'

/**
 * @name TabBarElement
 * React Navigation v5 custom navigation (bottom tab bar) builder with an
 * an interactive animation, and easily customisable.
 *
 * @param state Navigation state
 * @param navigation Navigation object
 * @param descriptors
 * @param appearence Object with appearence configurations (see readme)
 * @param rest
 *
 * @return function that creates the custom tab bar
 */
export default function TabBarElement({
	state,
	navigation,
	descriptors,
	appearence,
	tabBarOptions,
	rest,
}) {
	// Apprearence options destruction
	const {
		topPadding,
		verticalPadding,
		tabBarBackground,
		activeTabBackgrounds,
		activeColors,
		showIcon = true,
		showLabel = true,
	} = appearence

	const {
		activeTintColor,
		inactiveTintColor,
		activeBackgroundColor,
		inactiveBackgroundColor,
	} = tabBarOptions

	// State
	const [prevPos, setPrevPos] = React.useState(verticalPadding)
	const [pos, setPos] = React.useState(prevPos)
	const [width, setWidth] = React.useState(0)
	const [height, setHeight] = React.useState(0)
	const [animatedPos] = React.useState(() => new Animated.Value(1))

	// false = Portrait
	// true = Landscape
	const [isPortrait, setIsPortrait] = React.useState(true)

	// Reset animation when changing screen orietation
	Dimensions.addEventListener('change', () => {
		if (
			(isPortrait && !didChangeToPortrait()) ||
			(!isPortrait && didChangeToPortrait())
		) {
			setIsPortrait(!isPortrait)
			animation(animatedPos).start(() => {
				updatePrevPos()
			})
		}
	})

	/**
	 * @returns true if current orientation is Portrait, false otherwise
	 */
	const didChangeToPortrait = () => {
		const dim = Dimensions.get('screen')
		return dim.height >= dim.width
	}

	/**
	 * Dot animation
	 * @param {*} val animation value
	 * @returns Animated.CompositeAnimation
	 * Use .start() to start the animation
	 */
	const animation = val =>
		Animated.spring(val, {
			toValue: 1,
			useNativeDriver: false,
		})

	/**
	 * Helper function that updates the previous position
	 * of the tab to calculate the new position.
	 */
	const updatePrevPos = () => {
		setPos(pos => {
			setPrevPos(pos)
			return pos
		})
		animatedPos.setValue(0)
	}

	/**
	 * Handles physical button press for Android
	 */
	handleBackPress = () => {
		animation(animatedPos).start(() => {
			updatePrevPos()
		})
	}

	React.useEffect(() => {
		animation(animatedPos).start(() => {
			updatePrevPos()
		})

		if (Platform.OS === 'android') {
			BackHandler.addEventListener('hardwareBackPress', handleBackPress)
		}

		return () => {
			if (Platform.OS === 'android') {
				BackHandler.removeEventListener(
					'hardwareBackPress',
					handleBackPress,
				)
			}
		}
	}, [])

	/**
	 * Animate whenever the navigation state changes
	 */
	React.useEffect(() => {
		animation(animatedPos).start(() => {
			updatePrevPos()
		})
	}, [state.index])

	// Compute activeBackgroundColor, if array provided, use array otherwise fallback to
	// default tabBarOptions property activeBackgroundColor (fallbacks for all unspecified tabs)
	const activeTabBackground = activeTabBackgrounds
		? Array.isArray(activeTabBackgrounds)
			? activeTabBackgrounds[state.index] || activeBackgroundColor
			: activeTabBackgrounds
		: activeBackgroundColor

	// Compute activeBackgroundColor, if array provided, use array otherwise fallback to
	// default tabBarOptions property activeTintColor (fallbacks for all unspecified tabs)
	const activeColor = activeColors
		? Array.isArray(activeColors)
			? activeColors[state.index] || activeTintColor
			: activeColors
		: activeTintColor

	/**
	 * Create a tab button given a route and route index
	 * @param {*} route
	 * @param {*} routeIndex
	 * @returns React.Node with the button component
	 */
	const createTab = (route, routeIndex) => {
		const focused = routeIndex == state.index
		const { options } = descriptors[route.key]
		const tintColor = focused ? activeColor : inactiveTintColor

		const icon = options.tabBarIcon

		const label =
			options.tabBarLabel !== undefined
				? options.tabBarLabel
				: options.title !== undefined
				? options.title
				: route.name

		const accessibilityLabel =
			options.tabBarAccessibilityLabel !== undefined
				? options.tabBarAccessibilityLabel
				: typeof label === 'string'
				? `${label}, tab, ${routeIndex + 1} of ${state.routes.length}`
				: undefined

		// Render the label next to the icon
		// only if showLabel is true
		const renderLabel = () => {
			if (!showLabel) {
				return null
			}

			if (typeof label === 'string' && focused) {
				return (
					<Label icon={showIcon} activeColor={tintColor}>
						{label}
					</Label>
				)
			}

			if (focused) {
				return label({ focused, color: activeColor })
			}
		}

		/**
		 * Helper function to render the icon
		 */
		const renderIcon = () => {
			if (!showIcon || icon === undefined) {
				return null
			}
			let defaultIconSize = 20
			return icon({ focused, color: tintColor, size: defaultIconSize })
		}

		/**
		 * On Press Handler
		 * Emits an event to the navigation
		 */
		const onPress = () => {
			if (!focused) {
				animation(animatedPos).start(() => {
					updatePrevPos()
				})

				const event = navigation.emit({
					type: 'tabPress',
					target: route.key,
				})

				if (!event.defaultPrevented) {
					navigation.navigate(route.name)
				}
			}
		}

		/**
		 * On Long Press Handler
		 * Emits an event to the navigation
		 */
		const onLongPress = () => {
			if (!focused) {
				animation(animatedPos).start(() => {
					updatePrevPos()
				})

				navigation.emit({
					type: 'tabLongPress',
					target: route.key,
				})
			}
		}

		/**
		 * Read the position and dimension of a tab.
		 * and update animation state
		 * @param {*} e
		 */
		const onLayout = e => {
			if (focused) {
				setPos(e.nativeEvent.layout.x)
				setWidth(e.nativeEvent.layout.width)
				setHeight(e.nativeEvent.layout.height)
			}
		}

		return (
			<TabButton
				key={route.key}
				focused={focused}
				labelLength={label.length}
				accessibilityLabel={accessibilityLabel}
				onLayout={onLayout}
				onPress={onPress}
				onLongPress={onLongPress}>
				<View>{renderIcon()}</View>
				{renderLabel()}
			</TabButton>
		)
	}

	return (
		<React.Fragment>
			/** Current Screen */
			<View style={[{ flex: 1 }]}>
				{descriptors[state.routes[state.index].key].render()}
			</View>
			/** Tab Bar */
			<BottomTabBarWrapper
				topPadding={topPadding}
				verticalPadding={verticalPadding}
				tabBarBackground={tabBarBackground}
				shadow={SHADOW}>
				{state.routes.map(createTab)}
				/** Animated dot / background */
				<Dot
					topPadding={topPadding}
					activeTabBackground={activeTabBackground}
					style={{
						left: animatedPos.interpolate({
							inputRange: [0, 1],
							outputRange: [prevPos, pos],
						}),
					}}
					width={width}
					height={height}
				/>
			</BottomTabBarWrapper>
		</React.Fragment>
	)
}
