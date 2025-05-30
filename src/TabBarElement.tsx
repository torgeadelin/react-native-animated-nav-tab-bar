// TabBarElement.tsx

import React, { useEffect, useState, useRef } from "react";
import {
  CommonActions,
  Descriptor,
  Route,
  NavigationState,
  PartialState,
  TabNavigationState,
} from "@react-navigation/native";
import {
  Animated,
  BackHandler,
  I18nManager,
  NativeEventSubscription,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { ScreenContainer } from "react-native-screens";
import ResourceSavingScene from "./ResourceSavingScene";
import { IAppearanceOptions, TabElementDisplayOptions } from "./types";
import { BottomTabBarWrapper, Dot, Label, TabButton } from "./UIComponents";

// ─── Fallback defaults for tabBarOptions ─────────────────────
const defaultTabBarOptions = {
  activeTintColor: "black",
  inactiveTintColor: "black",
  activeBackgroundColor: "#FFCF64",
  tabStyle: undefined as any,
  labelStyle: undefined as any,
};

type PartialTabBarOptions = Partial<typeof defaultTabBarOptions>;

interface TabBarElementProps {
  state: TabNavigationState<Record<string, object | undefined>>;
  navigation: any;
  descriptors: Record<string, Descriptor<any, any, any>>;
  appearance: IAppearanceOptions;
  // now a Partial, so `{}` is valid
  tabBarOptions?: PartialTabBarOptions;
  lazy?: boolean;
}

export default function TabBarElement({
  state,
  navigation,
  descriptors,
  appearance,
  tabBarOptions = {},
  lazy = true,
}: TabBarElementProps) {
  // ─── Merge & destructure tabBarOptions ───────────────────────
  const {
    activeTintColor,
    inactiveTintColor,
    activeBackgroundColor,
    tabStyle,
    labelStyle,
  } = { ...defaultTabBarOptions, ...tabBarOptions };

  // ─── Appearance options ──────────────────────────────────────
  const {
    topPadding,
    bottomPadding,
    horizontalPadding,
    tabBarBackground,
    activeTabBackgrounds,
    activeColors,
    floating,
    dotCornerRadius,
    whenActiveShow,
    whenInactiveShow,
    dotSize,
    shadow,
    tabButtonLayout,
  } = appearance;

  // ─── Layout & animation state ────────────────────────────────
  const [prevPos, setPrevPos] = useState(horizontalPadding);
  const [pos, setPos] = useState(prevPos);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const animatedPos = useRef(new Animated.Value(1)).current;
  const [loaded, setLoaded] = useState<number[]>([state.index]);
  const previousIndex = useRef(state.index);

  useEffect(() => {
    if (!loaded.includes(state.index)) {
      setLoaded((prev) => [...prev, state.index]);
    }
  }, [state.index, loaded]);

  // ─── Animate *only* when index truly changes ─────────────────
  useEffect(() => {
    if (previousIndex.current === state.index) return;

    animatedPos.setValue(0);
    Animated.spring(animatedPos, {
      toValue: 1,
      useNativeDriver: false,
    }).start(() => {
      setPrevPos(pos);
      previousIndex.current = state.index;
    });
  }, [state.index, pos, animatedPos]);

  // ─── Suppress Android back‐press animation ───────────────────
  useEffect(() => {
    let sub: NativeEventSubscription | undefined;
    if (Platform.OS === "android") {
      sub = BackHandler.addEventListener("hardwareBackPress", () => false);
    }
    return () => sub?.remove();
  }, []);

  // ─── Helpers for per‐tab background & tint ───────────────────
  const activeTabBackground = activeTabBackgrounds
    ? Array.isArray(activeTabBackgrounds)
      ? activeTabBackgrounds[state.index] ?? activeBackgroundColor
      : activeTabBackgrounds
    : activeBackgroundColor;

  const activeColor = activeColors
    ? Array.isArray(activeColors)
      ? activeColors[state.index] ?? activeTintColor
      : activeColors
    : activeTintColor;

  // ─── Build each tab button ───────────────────────────────────
  const createTab = (
    route: Route<string> & {
      state?: NavigationState | PartialState<NavigationState>;
    },
    routeIndex: number
  ) => {
    const focused = routeIndex === state.index;
    const { options } = descriptors[route.key];
    const tintColor = focused ? activeColor : inactiveTintColor;
    const label = options.tabBarLabel ?? options.title ?? route.name;
    const icon = options.tabBarIcon;

    // capture layout
    const onLayout = (e: any) => {
      if (focused) {
        setPos(e.nativeEvent.layout.x);
        setWidth(e.nativeEvent.layout.width);
        setHeight(e.nativeEvent.layout.height);
      }
    };

    // press/long‐press
    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });
      if (!focused && !event.defaultPrevented) {
        navigation.dispatch({
          ...CommonActions.navigate(route.name),
          target: state.key,
        });
      }
    };
    const onLongPress = () =>
      navigation.emit({
        type: "tabLongPress",
        target: route.key,
      });

    // render icon & label
    const renderIcon = () =>
      icon ? icon({ focused, color: tintColor, size: 20 }) : null;
    const renderLabel = () =>
      typeof label === "string" ? (
        <Label
          tabButtonLayout={tabButtonLayout}
          whenActiveShow={whenActiveShow}
          whenInactiveShow={whenInactiveShow}
          style={labelStyle}
          activeColor={tintColor}
        >
          {label}
        </Label>
      ) : (
        label({ focused, color: tintColor })
      );

    const content = focused ? (
      whenActiveShow === TabElementDisplayOptions.ICON_ONLY ? (
        renderIcon()
      ) : whenActiveShow === TabElementDisplayOptions.LABEL_ONLY ? (
        renderLabel()
      ) : (
        <>
          {renderIcon()}
          {renderLabel()}
        </>
      )
    ) : whenInactiveShow === TabElementDisplayOptions.ICON_ONLY ? (
      renderIcon()
    ) : whenInactiveShow === TabElementDisplayOptions.LABEL_ONLY ? (
      renderLabel()
    ) : (
      <>
        {renderIcon()}
        {renderLabel()}
      </>
    );

    return (
      <TabButton
        key={route.key}
        focused={focused}
        labelLength={String(label).length}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        onLayout={onLayout}
        onPress={onPress}
        onLongPress={onLongPress}
        dotSize={dotSize}
        tabButtonLayout={tabButtonLayout}
      >
        {content}
      </TabButton>
    );
  };

  // overlay for floating style
  const overlayStyle = StyleSheet.create({
    overlayStyle: {
      top: 0,
      width: "100%",
      height: "100%",
      position: "absolute",
      justifyContent: "flex-end",
    },
  }).overlayStyle;

  // should we show the bar?
  const { options } = descriptors[state.routes[state.index].key];
  const tabBarVisible = options.tabBarVisible ?? true;

  return (
    <>
      {/* Screens */}
      <View style={{ flex: 1, overflow: "hidden" }}>
        <ScreenContainer style={{ flex: 1 }}>
          {state.routes.map((route, index) => {
            const descriptor = descriptors[route.key];
            const isFocused = state.index === index;
            if (descriptor.options.unmountOnBlur && !isFocused) {
              return null;
            }
            if (lazy && !loaded.includes(index) && !isFocused) {
              return null;
            }
            return (
              <ResourceSavingScene
                key={route.key}
                isVisible={isFocused}
                style={StyleSheet.absoluteFill}
              >
                <View
                  importantForAccessibility={
                    isFocused ? "auto" : "no-hide-descendants"
                  }
                  accessibilityElementsHidden={!isFocused}
                  style={{ flex: 1 }}
                >
                  {descriptor.render()}
                </View>
              </ResourceSavingScene>
            );
          })}
        </ScreenContainer>
      </View>

      {/* Tab Bar */}
      {tabBarVisible && (
        <View pointerEvents="box-none" style={floating && overlayStyle}>
          <BottomTabBarWrapper
            style={tabStyle}
            floating={floating}
            topPadding={topPadding}
            bottomPadding={bottomPadding}
            horizontalPadding={horizontalPadding}
            tabBarBackground={tabBarBackground}
            shadow={shadow}
          >
            {state.routes.map(createTab)}

            {/* Animated Dot */}
            <Dot
              dotCornerRadius={dotCornerRadius}
              topPadding={topPadding}
              activeTabBackground={activeTabBackground}
              style={
                I18nManager.isRTL
                  ? {
                      right: animatedPos.interpolate({
                        inputRange: [0, 1],
                        outputRange: [prevPos, pos],
                      }),
                    }
                  : {
                      left: animatedPos.interpolate({
                        inputRange: [0, 1],
                        outputRange: [prevPos, pos],
                      }),
                    }
              }
              width={width}
              height={height}
            />
          </BottomTabBarWrapper>
        </View>
      )}
    </>
  );
}
