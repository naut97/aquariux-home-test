import { Dimensions } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import get from 'lodash/get';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const StaticBottomInset = get(initialWindowMetrics, 'insets.bottom', 0);

const AppDimensions = {
  screenWidth,
  screenHeight,
  windowWidth,
  windowHeight,
  bottomHeight: StaticBottomInset > 0 ? 55 + StaticBottomInset : 55,
};

export default AppDimensions;
