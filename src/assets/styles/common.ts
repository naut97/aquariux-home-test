import { StyleSheet } from 'react-native';
import AppDimensions from '@/assets/styles/dimens.ts';

const Common = StyleSheet.create({
  flex: {
    flex: 1,
  },
  shrink: {
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
  },
  rowFCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowHCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullScreen: {
    width: AppDimensions.windowWidth,
    height: AppDimensions.windowHeight,
  },
  bottomIcon: {
    height: 20,
    resizeMode: 'contain',
  },
  itemXCenter: {
    alignItems: 'center',
  },
  itemYCenter: {
    justifyContent: 'center',
  },
  itemXYCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.10)',
    backgroundColor: 'white',
  },
  textInputBorder: {
    borderColor: '#E3E3E3',
  },
  textCenter: {
    textAlign: 'center',
  },
  jBetween: { justifyContent: 'space-between' },
  hitslop: { top: 15, bottom: 15, left: 15, right: 15 },
});

export default Common;
