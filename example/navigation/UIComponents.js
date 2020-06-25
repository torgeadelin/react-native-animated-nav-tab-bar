import react from 'react'
import { Animated } from 'react-native'
import Styled, { css } from 'styled-components'
import { isIphoneX } from './iPhoneX'

// Config
const BOTTOM_PADDING = 10
const BOTTOM_PADDING_IPHONE_X = 30

const BottomTabBarWrapper = Styled.View`
    position: absolute;
	bottom: 0;
    flex-direction: row;
    width: 100%;
    elevation: 2;
    padding-bottom: ${isIphoneX() ? BOTTOM_PADDING_IPHONE_X : BOTTOM_PADDING};
    padding-top: ${p => p.topPadding};
    padding-horizontal: ${p => p.verticalPadding};
    background-color: ${p => p.tabBarBackground};
	${p => p.shadow && SHADOW};

  `

const TabButton = Styled.TouchableOpacity`
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-radius: 100;
	padding-vertical: 10;
	flex-grow: ${p => (p.focused ? p.labelLength / 10 + 1 : 1)};
`

const Label = Styled(Animated.Text)`
	color: ${p => p.activeColor};
	font-weight: bold;
	margin-left: ${p => (p.icon ? 8 : 0)};
`

const Dot = Styled(Animated.View)`
	position: absolute;
	top: ${p => p.topPadding};
	width: ${p => p.width};
	height: ${p => p.height};
	border-radius: 100;
	background-color: ${p => p.activeTabBackground};
	z-index: -1;
`

const ScreenWrapper = Styled.View`
	position: relative;
	width: 100%;
	height: 100%;
	backgroundColor: transparent;
`

const SHADOW = css`
	shadow-color: #000000;
	shadow-offset: 0px 5px;
	shadow-opacity: 0.05;
	elevation: 1;
	shadow-radius: 20;
`

export { BottomTabBarWrapper, TabButton, Label, Dot, ScreenWrapper, SHADOW }
