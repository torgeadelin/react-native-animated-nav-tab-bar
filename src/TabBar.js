import PropTypes from "prop-types";
import React from "react";
import { Animated, BackHandler, View } from "react-native";
import styled, { css } from "styled-components/native";
import { isIphoneX } from "./utils/iPhoneX";

//Wrapper
const BOTTOM_PADDING = 10;
const BOTTOM_PADDING_IPHONE_X = 30;

const Wrapper = styled.View`
  position: relative;
  flex-direction: row;
  width: 100%;
  elevation: 2;
  padding-bottom: ${isIphoneX() ? BOTTOM_PADDING_IPHONE_X : BOTTOM_PADDING};
  padding-top: ${p => p.topPadding};
  padding-horizontal: ${p => p.verticalPadding};
  background-color: ${p => p.tabBarBackground};
  ${p => p.shadow && SHADOW};
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 100;
  padding-vertical: 10;
  flex-grow: ${p => (p.isRouteActive ? p.labelLength / 10 + 1 : 1)};
`;

const Label = styled(Animated.Text)`
  color: ${p => p.activeColor};
  font-weight: bold;
  margin-left: ${p => (p.icon ? 8 : 0)};
`;

const Dot = styled(Animated.View)`
  position: absolute;
  top: ${p => p.topPadding};
  width: ${p => p.width};
  height: ${p => p.height};
  border-radius: 100;
  background-color: ${p => p.activeTabBackground};
  z-index: -1;
`;

export default class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevPos: this.props.verticalPadding,
      pos: 0,
      width: 0,
      height: 0,
      animatedPos: new Animated.Value(1)
    };
  }

  animation = value =>
    Animated.spring(value, {
      toValue: 1
    });

  componentDidMount() {
    this.animation(this.state.animatedPos).start(() => {
      this.setState({
        prevPos: this.state.pos
      });
      this.state.animatedPos.setValue(0);
    });
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackPress
      );
    }
  }

  handleBackPress = () => {
    this.animation(this.state.animatedPos).start(() => {
      this.setState({
        prevPos: this.state.pos
      });
      this.state.animatedPos.setValue(0);
    });
  };

  createTab = (route, routeIndex) => {
    const {
      inactiveTintColor,
      state,
      descriptors,
      navigation,
      showIcon = true,
      showLabel = true,
      activeColors,
      state: navigationState
    } = this.props;

    const activeColor = activeColors
      ? Array.isArray(activeColors)
        ? activeColors[state.index] || "#000"
        : activeColors
      : "#000";

    const focused = routeIndex == navigationState.index;
    const { options } = descriptors[route.key];
    const tintColor = focused ? activeColor : inactiveTintColor;

    // https://github.com/react-navigation/react-navigation/blob/master/packages/bottom-tabs/src/views/BottomTabBar.tsx#L221-L233
    const icon = options.tabBarIcon;
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;
    const accessibilityLabel =
      options.tabBarAccessibilityLabel !== undefined
        ? options.tabBarAccessibilityLabel
        : typeof label === "string"
        ? `${label}, tab, ${routeIndex + 1} of ${navigationState.routes.length}`
        : undefined;

    const onPress = () => {
      if (!focused) {
        this.animation(this.state.animatedPos).start(() => {
          this.setState(prev => ({
            prevPos: prev.pos
          }));
          this.state.animatedPos.setValue(0);
        });

        const event = navigation.emit({
          type: "tabPress",
          target: route.key
        });

        if (!event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      }
    };

    const onLongPress = () => {
      if (!focused) {
        this.animation(this.state.animatedPos).start(() => {
          this.setState(prev => ({
            prevPos: prev.pos
          }));
          this.state.animatedPos.setValue(0);
        });

        navigation.emit({
          type: "tabLongPress",
          target: route.key
        });
      }
    };

    const renderLabel = () => {
      if (!showLabel) {
        return null;
      }

      if (focused) {
        if (typeof label === "string") {
          return (
            <Label icon={showIcon} activeColor={activeColor}>
              {label}
            </Label>
          );
        }

        return label({ focused, color: activeColor });
      }
    };

    const renderIcon = () => {
      if (!showIcon || icon === undefined) {
        return null;
      }

      return icon({ focused, color: tintColor });
    };
    return (
      <TabButton
        icon={icon}
        labelLength={label.length}
        onLayout={event => {
          focused &&
            this.setState({
              pos: event.nativeEvent.layout.x,
              width: event.nativeEvent.layout.width,
              height: event.nativeEvent.layout.height
            });
        }}
        isRouteActive={focused}
        key={routeIndex}
        onPress={onPress}
        onLongPress={onLongPress}
        accessibilityLabel={accessibilityLabel}
      >
        <View>{renderIcon()}</View>
        {renderLabel()}
      </TabButton>
    );
  };

  render() {
    const {
      state,
      verticalPadding,
      tabBarBackground,
      shadow,
      topPadding,
      activeTabBackgrounds
    } = this.props;

    // const { routes, index: activeRouteIndex } = navigation.state;
    const activeTabBackground = activeTabBackgrounds
      ? Array.isArray(activeTabBackgrounds)
        ? activeTabBackgrounds[state.index] || "#E4F7F7"
        : activeTabBackgrounds
      : "#E4F7F7";

    return (
      <Wrapper
        topPadding={topPadding}
        verticalPadding={verticalPadding}
        tabBarBackground={tabBarBackground}
        shadow={shadow}
      >
        {state.routes.map(this.createTab)}
        <Dot
          topPadding={topPadding}
          activeTabBackground={activeTabBackground}
          style={{
            left: this.state.animatedPos.interpolate({
              inputRange: [0, 1],
              outputRange: [this.state.prevPos, this.state.pos]
            })
          }}
          width={this.state.width}
          height={this.state.height}
        />
      </Wrapper>
    );
  }
}

//Shadow
const SHADOW = css`
  shadow-color: #000000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.05;
  elevation: 1;
  shadow-radius: 20;
`;

TabBar.propTypes = {
  activeTabBackground: PropTypes.string.isRequired,
  tabBarBackground: PropTypes.string.isRequired,
  shadow: PropTypes.bool.isRequired,
  verticalPadding: PropTypes.number.isRequired,
  topPadding: PropTypes.number.isRequired
};

TabBar.defaultProps = {
  activeTabBackground: "#E4F7F7",
  tabBarBackground: "#FFFFFF",
  shadow: true,
  verticalPadding: 10,
  topPadding: 10
};
