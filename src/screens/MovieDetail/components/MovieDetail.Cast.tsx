import React from 'react';
import { View, Image } from 'react-native';
import { ICast } from '@/screens/MovieDetail/types.ts';
import get from 'lodash/get';
import CText from '@/components/common/CText';
import CSpacing from '@/assets/styles/spacing.ts';
import Common from '@/assets/styles/common.ts';
import CRadius from '@/assets/styles/radius.ts';
import Colors from '@/assets/colors.ts';

interface IProps {
  cast: ICast;
}

const MovieDetailCast = ({ cast }: IProps) => {
  return (
    <View style={[Common.shadow, { borderRadius: CRadius.l, width: 139 }]}>
      <Image
        source={{ uri: get(cast, 'profilePath') }}
        style={{
          width: 139,
          height: 154,
          borderTopLeftRadius: CRadius.l,
          borderTopRightRadius: CRadius.l,
          resizeMode: 'cover',
          backgroundColor: Colors.neutral_5,
        }}
      />
      <View style={{ padding: CSpacing.s, justifyContent: 'center' }}>
        <CText.H5>{get(cast, 'character', '')}</CText.H5>
        <CText.SupportSmRegular>{get(cast, 'name', '')}</CText.SupportSmRegular>
      </View>
    </View>
  );
};

export default MovieDetailCast;
