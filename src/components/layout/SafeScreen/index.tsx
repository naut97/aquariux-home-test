import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

import {
  Edge,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Colors from '@/assets/colors.ts';
import Common from '@/assets/styles/common.ts';
import CSpacing from '@/assets/styles/spacing.ts';
import Icons from '@/assets/icon';
import AppDimensions from '@/assets/styles/dimens.ts';

interface IProps {
  children: React.ReactNode;
  hideBackButton?: boolean;
  edges?: Edge[];
  punchBottom?: boolean;
  punchTop?: boolean;
  isBottomScreen?: boolean;
  onPressLeft?: () => void;
  backgroundColor?: string;
  isLoading?: boolean;
}

const SafeScreen = (props: IProps) => {
  const {
    children,
    edges = ['bottom'],
    punchBottom = false,
    punchTop = false,
    isBottomScreen = false,
    backgroundColor = Colors.white,
    isLoading = false,
  } = props;

  const { bottom, top } = useSafeAreaInsets();

  return (
    <SafeAreaView edges={edges}>
      {!isLoading ? (
        <View
          style={[
            Common.fullScreen,
            { backgroundColor: backgroundColor },
            punchTop && { paddingTop: top || CSpacing.xs },
            punchBottom && { paddingBottom: bottom || CSpacing.xs },
            isBottomScreen && { paddingBottom: AppDimensions.bottomHeight },
          ]}
        >
          <View style={[Common.itemXYCenter, { paddingBottom: CSpacing.s }]}>
            <Image source={Icons.logo} style={styles.logo} />
          </View>
          {children}
        </View>
      ) : (
        <View
          style={[
            Common.fullScreen,
            { backgroundColor: Colors.white },
            Common.itemXYCenter,
          ]}
        >
          <Image
            source={Icons.logo}
            style={[styles.logo, { height: 40, marginBottom: CSpacing.m }]}
          />
          <ActivityIndicator
            size={'large'}
            color={Colors.primaryControlColor}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 57,
    resizeMode: 'contain',
  },
});

export default SafeScreen;
