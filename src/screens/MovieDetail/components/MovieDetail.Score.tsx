import React, { useMemo, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import CSpacing from '@/assets/styles/spacing.ts';
import Common from '@/assets/styles/common.ts';
import CText from '@/components/common/CText';
import Colors from '@/assets/colors.ts';

type Props = {
  score: number;
};

const SIZE = 60;
const STROKE = 4;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

const UserScoreCard = ({ score }: Props) => {
  const clamped = Math.max(0, Math.min(100, score));
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: clamped,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, [clamped]);

  const dashOffset = progress.interpolate({
    inputRange: [0, 100],
    outputRange: [CIRC, 0],
  });

  const percent = useMemo(() => `${Math.round(clamped)}%`, [clamped]);

  return (
    <View
      style={[
        Common.itemXYCenter,
        {
          alignSelf: 'flex-start',
          padding: CSpacing.xs,
          borderRadius: SIZE,
          backgroundColor: '#0E2740',
        },
      ]}
    >
      <View style={styles.gaugeShadow}>
        <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke="#94D1E8"
            strokeOpacity={0.35}
            strokeWidth={STROKE}
            fill="#0E2740"
          />
          <AnimatedCircle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke="#7CF08D"
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={`${CIRC} ${CIRC}`}
            rotation="-90"
            originX={SIZE / 2}
            originY={SIZE / 2}
            strokeDashoffset={dashOffset as unknown as number}
          />
        </Svg>

        <View style={styles.centerText}>
          <CText.BodySemiBold color={Colors.white}>
            {percent}
          </CText.BodySemiBold>
        </View>
      </View>
    </View>
  );
};

// Animated wrapper cho Circle
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  gaugeShadow: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  right: { flex: 1 },
  personRow: { marginBottom: 14 },
  personName: { color: 'white', fontSize: 20, fontWeight: '700' },
  personRoles: { color: 'white', opacity: 0.9, marginTop: 2, fontSize: 16 },
});

export default UserScoreCard;
