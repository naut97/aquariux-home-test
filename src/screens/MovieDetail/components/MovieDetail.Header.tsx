import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import * as SolidIcons from 'react-native-heroicons/solid';
import Colors from '@/assets/colors.ts';
import CSpacing from '@/assets/styles/spacing.ts';
import CText from '@/components/common/CText';
import { useNavigation } from '@react-navigation/native';
import Common from '@/assets/styles/common.ts';
import { ICON_SIZE } from '@/assets/styles/images.ts';
import { MovieDetailData } from '@/types/data.ts';
import get from 'lodash/get';

interface IMovieDetailHeaderProps {
  movie: MovieDetailData;
}

const MovieDetailHeader = ({ movie }: IMovieDetailHeaderProps) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        Common.rowHCenter,
        Common.jBetween,
        { paddingVertical: CSpacing.s, backgroundColor: 'rgba(0, 0, 0, 0.15)' },
      ]}
    >
      <TouchableOpacity
        onPress={navigation.goBack}
        style={{
          borderRadius: 25,
          padding: CSpacing.xs,
        }}
      >
        <SolidIcons.ChevronLeftIcon color={Colors.white} size={ICON_SIZE} />
      </TouchableOpacity>
      <CText.H4
        color={Colors.white}
        style={[
          Common.textCenter,
          Common.shrink,
          { marginHorizontal: CSpacing.l },
        ]}
        numberOfLines={1}
      >
        {get(movie, 'title')}{' '}
        <CText typo={'h5'} color={Colors.white}>
          ({get(movie, 'releaseYear')})
        </CText>
      </CText.H4>

      <View
        style={{
          width: ICON_SIZE + 2 * CSpacing.xs,
          height: ICON_SIZE,
          padding: CSpacing.xs,
        }}
      />
    </View>
  );
};

export default MovieDetailHeader;
