import React from 'react';
import CSpacing from '@/assets/styles/spacing.ts';
import { Image, View } from 'react-native';
import get from 'lodash/get';
import CRadius from '@/assets/styles/radius.ts';
import CText from '@/components/common/CText';
import Colors from '@/assets/colors.ts';
import { MovieDetailData } from '@/types/data.ts';
import { toHourMinuteCompact } from '@/utils/dateUtil.ts';

interface IProps {
  movie: MovieDetailData;
  releaseData: any;
}

const MovieDetailInformation = ({ movie, releaseData }: IProps) => {
  const certification = get(releaseData, 'certification');
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: CSpacing.s29,
        backgroundColor: 'rgba(0,0,0,0.15)',
      }}
    >
      <Image
        source={{ uri: get(movie, 'posterImage', '') }}
        style={{
          overflow: 'hidden',
          width: 120,
          height: 160,
          resizeMode: 'cover',
          borderRadius: CRadius.l,
        }}
      />
      <View style={{ flex: 1, paddingLeft: CSpacing.l, rowGap: CSpacing.s }}>
        {certification ? (
          <View
            style={{
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: CRadius.s,
              alignSelf: 'flex-start',
              paddingHorizontal: CSpacing.xs,
            }}
          >
            <CText typo={'h5_regular'} color={'rgba(255, 255, 255, 0.7)'}>
              {certification}
            </CText>
          </View>
        ) : null}
        <CText.BodyRegular color={Colors.white}>
          {get(movie, 'releaseDate', '')}
          {' • '}
          {toHourMinuteCompact(get(movie, 'runtime', 0))}
        </CText.BodyRegular>
        <CText.BodyRegular color={Colors.white}>
          {get(movie, 'genres', '')}
        </CText.BodyRegular>
        <CText typo={'body_semibold'} color={Colors.white}>
          Status:{' '}
          <CText.BodyRegular color={Colors.white}>
            {get(movie, 'releaseStatus', '')}
          </CText.BodyRegular>
        </CText>
        <CText typo={'body_semibold'} color={Colors.white}>
          Language:{' '}
          <CText.BodyRegular color={Colors.white}>
            {get(movie, 'originalLanguage', '')}
          </CText.BodyRegular>
        </CText>
        <CText.SupportMedium color={Colors.neutral_5}>{}</CText.SupportMedium>
      </View>
    </View>
  );
};

export default MovieDetailInformation;
