import SCREEN_NAMES from './screens.ts';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import Screens from './screens.ts';

export type RootStackParamList = {
  [SCREEN_NAMES.BOTTOM_NAVIGATOR]: undefined;
  [SCREEN_NAMES.HOME]: undefined;
  [SCREEN_NAMES.MOVIE_DETAIL]: { movieId: number };
};

export type NavigationTypes<K extends Screens> = NavigationProp<
  RootStackParamList,
  K
>;
export type RouteTypes<K extends Screens> = RouteProp<RootStackParamList, K>;
