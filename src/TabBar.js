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
  flex-grow: ${p => (p.focused ? p.labelLength / 10 + 1 : 1)};
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

export default TabBar = ({
  verticalPadding,
  topPadding,
  inactiveTintColor,
  tabBarBackground,
  shadow,
  descriptors,
  showIcon = true,
  showLabel = true,
  activeColors,
  navigation,
  activeTabBackgrounds,
  state: navigationState
}) => {
  const [prevPos, setPrevPos] = React.useState(verticalPadding);
  const [pos, setPos] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [animatedPos] = React.useState(() => new Animated.Value(1));

  const animation = val =>
    Animated.spring(val, {
      toValue: 1,
      useNativeDriver: false
    });

  handleBackPress = () => {
    animation(animatedPos).start(() => {
      updatePrevPos();
    });
  };

  React.useEffect(() => {
    animation(animatedPos).start(() => {
      updatePrevPos();
    });

    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    }

    return () => {
      if (Platform.OS === "android") {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      }
    };
  }, []);

  React.useEffect(() => {
    animation(animatedPos).start(() => {
      updatePrevPos();
    });

  }, [navigationState.index]);

  const activeTabBackground = activeTabBackgrounds
    ? Array.isArray(activeTabBackgrounds)
      ? activeTabBackgrounds[navigationState.index] || "#E4F7F7"
      : activeTabBackgrounds
    : "#E4F7F7";
  const activeColor = activeColors
    ? Array.isArray(activeColors)
      ? activeColors[navigationState.index] || "#000"
      : activeColors
    : "#000";

  const updatePrevPos = () => {
    setPos(pos => {
      setPrevPos(pos);
      return pos;
    });
    animatedPos.setValue(0);
  };

  const createTab = (route, routeIndex) => {
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

    const renderLabel = () => {
      if (!showLabel) {
        return null;
      }

      if (typeof label === "string" && focused) {
        return (
          <Label icon={showIcon} activeColor={activeColor}>
            {label}
          </Label>
        );
      }

      if (focused) {
        return label({ focused, color: activeColor });
      }
    };

    const renderIcon = () => {
      if (!showIcon || icon === undefined) {
        return null;
      }

      return icon({ focused, color: tintColor });
    };

    const onPress = () => {
      if (!focused) {
        animation(animatedPos).start(() => {
          updatePrevPos();
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
        animation(animatedPos).start(() => {
          updatePrevPos();
        });

        navigation.emit({
          type: "tabLongPress",
          target: route.key
        });
      }
    };

    const onLayout = e => {
      if (focused) {
        setPos(e.nativeEvent.layout.x);
        setWidth(e.nativeEvent.layout.width);
        setHeight(e.nativeEvent.layout.height);
      }
    };

    return (
      <TabButton
        key={route.key}
        focused={focused}
        labelLength={label.length}
        accessibilityLabel={accessibilityLabel}
        onLayout={onLayout}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <View>{renderIcon()}</View>
        {renderLabel()}
      </TabButton>
    );
  };

  return (
    <Wrapper
      topPadding={topPadding}
      verticalPadding={verticalPadding}
      tabBarBackground={tabBarBackground}
      shadow={shadow}
    >
      {navigationState.routes.map(createTab)}
      <Dot
        topPadding={topPadding}
        activeTabBackground={activeTabBackground}
        style={{
          left: animatedPos.interpolate({
            inputRange: [0, 1],
            outputRange: [prevPos, pos]
          })
        }}
        width={width}
        height={height}
      />
    </Wrapper>
  );
};

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
