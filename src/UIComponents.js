import react from "react";
import { Animated } from "react-native";
import Styled, { css } from "styled-components";
import { isIphoneX } from "./utils/iPhoneX";

// Config
const BOTTOM_PADDING = 10;
const BOTTOM_PADDING_IPHONE_X = 30;

const floatingMarginBottom = css`
  margin-bottom: ${isIphoneX() ? BOTTOM_PADDING_IPHONE_X : BOTTOM_PADDING}px;
`;
const floatingMarginHorizontal = css`
  margin-horizontal: 20px;
`;

const floatingRoundCorner = css`
  border-radius: 40px;
`;

const BottomTabBarWrapper = Styled.View`
	flex-direction: row;
	${(p) => p.floating && floatingMarginHorizontal};
    elevation: 2;
	${(p) => p.floating && floatingMarginBottom};
	${(p) => p.floating && floatingRoundCorner};
    padding-bottom: ${(p) =>
      p.floating
        ? BOTTOM_PADDING * 2
        : isIphoneX()
        ? BOTTOM_PADDING_IPHONE_X
        : BOTTOM_PADDING};
    padding-top: ${(p) => p.topPadding};
    padding-horizontal: ${(p) => p.horizontalPadding};
    background-color: ${(p) => p.tabBarBackground};
	${(p) => p.shadow && SHADOW};

  `;

const calculateDotSize = (size) => {
  switch (size) {
    case "small":
      return 40;
      break;
    case "medium":
      return 10;
      break;
    case "large":
      return 5;
      break;
    default:
      return 10;
  }
};

const TabButton = Styled.TouchableOpacity`
	flex: 1;
	flex-direction: ${(p) =>
    p.whenInactiveShow == "both" && p.whenActiveShow == "both"
      ? "column"
      : "row"};
	justify-content: center;
	align-items: center;
	border-radius: 100;
	padding-vertical: 10;
	flex-grow: ${(p) =>
    p.focused ? p.labelLength / calculateDotSize(p.dotSize) + 1 : 1};
`;

const Label = Styled(Animated.Text)`
	fontSize: ${(p) =>
    p.whenInactiveShow == "both" || p.whenActiveShow == "both" ? "14" : "17"};
	color: ${(p) => p.activeColor};
	font-weight: bold;
	margin-left: ${(p) =>
    p.whenActiveShow == "both" || p.whenInactiveShow == "both" ? 8 : 0};
`;

const Dot = Styled(Animated.View)`
	position: absolute;
	top: ${(p) => p.topPadding};
	width: ${(p) => p.width};
	height: ${(p) => p.height};
	border-radius: ${(p) => p.dotCornerRadius};
	background-color: ${(p) => p.activeTabBackground};
	z-index: -1;
`;

const SHADOW = css`
  shadow-color: #000000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.05;
  elevation: 1;
  shadow-radius: 20;
`;

export { BottomTabBarWrapper, TabButton, Label, Dot, SHADOW };
