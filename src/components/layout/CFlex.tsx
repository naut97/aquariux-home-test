import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CFlexProps {
  children: React.ReactNode;
  scrollable?: boolean;
  onScroll?: (e: any) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  noEdges?: boolean;
}

const CFlex = ({
  children,
  scrollable = false,
  onScroll,
  onRefresh = () => {},
  isRefreshing = false,
  noEdges = false,
}: CFlexProps) => {
  const insets = useSafeAreaInsets();
  const Wrapper = scrollable ? ScrollView : View;
  return (
    <Wrapper
      style={[
        styles.container,
        !noEdges && {
          paddingTop: insets.top,
          // paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
      scrollEventThrottle={16}
      bounces={false}
      onScroll={onScroll}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />
      }
    >
      {children}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CFlex;
