import { Image } from 'react-native';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import SCREEN_NAMES from '@/navigation/screens.ts';
import Home from '@/screens/Home';
import React from 'react';
import WatchList from '@/screens/WatchList';
import AppDimensions from '@/assets/styles/dimens.ts';
import Colors from '@/assets/colors.ts';
import Icons from '@/assets/icon';
import Common from '@/assets/styles/common.ts';

const BottomTab = createBottomTabNavigator();

const BottomHomeIcon = () => {
  return <Image source={Icons.ic_home} style={Common.bottomIcon} />;
};

const BottomWatchListIcon = () => {
  return <Image source={Icons.ic_watchlist} style={Common.bottomIcon} />;
};

const BottomNavigator = () => {
  return (
    <BottomTab.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        freezeOnBlur: true,
        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: false,
        tabBarStyle: {
          paddingTop: 15,
          backgroundColor: Colors.dark_blue,
          height: AppDimensions.bottomHeight,
        },
      }}
    >
      <BottomTab.Screen
        name={SCREEN_NAMES.HOME}
        component={Home}
        options={{ headerShown: false, tabBarIcon: BottomHomeIcon }}
      />
      <BottomTab.Screen
        name={SCREEN_NAMES.WATCH_LIST}
        component={WatchList}
        options={{ headerShown: false, tabBarIcon: BottomWatchListIcon }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;
