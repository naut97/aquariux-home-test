import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types.ts';
import SCREEN_NAMES from './screens.ts';
import Home from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';
import Colors from '@/assets/colors.ts';
import useAppConfiguration from '@/hooks/useAppConfiguration.ts';
import BottomNavigator from '@/navigation/BottomNavigator.tsx';

const AppStack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName={SCREEN_NAMES.BOTTOM_NAVIGATOR}
      screenOptions={{
        cardStyle: {
          backgroundColor: Colors.primaryBackgroundColor,
        },
      }}
    >
      <AppStack.Screen
        name={SCREEN_NAMES.BOTTOM_NAVIGATOR}
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={SCREEN_NAMES.MOVIE_DETAIL}
        component={MovieDetail}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
