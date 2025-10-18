import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { ICast } from '@/screens/MovieDetail/types.ts';
import MovieDetailCast from '@/screens/MovieDetail/components/MovieDetail.Cast.tsx';
import CSpacing from '@/assets/styles/spacing.ts';
import Colors from '@/assets/colors.ts';
import CText from '@/components/common/CText';
import Localization from '@/utils/localization.ts';
import useMovieCasts from '@/screens/MovieDetail/hooks/useMovieCasts.ts';
import * as SolidIcons from 'react-native-heroicons/solid';
import { MovieDetailData } from '@/types/data.ts';
import get from 'lodash/get';

interface IProps {
  movie: MovieDetailData;
}

const MovieDetailCastList = ({ movie }: IProps) => {
  const { data } = useMovieCasts({
    movieId: get(movie, 'id', 0),
  });

  const renderItem = ({ item }: { item: ICast }) => {
    return <MovieDetailCast cast={item} />;
  };

  return data.length > 0 ? (
    <View
      style={{
        paddingTop: CSpacing.m,
        paddingHorizontal: CSpacing.m,
        backgroundColor: Colors.primaryBackgroundColor,
      }}
    >
      <View>
        <CText.H4>
          {Localization.t('MOVIE.CASTS', { number: data.length })}
        </CText.H4>
      </View>
      <View style={{ marginTop: CSpacing.m, marginBottom: CSpacing.m }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          style={{ overflow: 'visible' }}
          contentContainerStyle={{ columnGap: CSpacing.m, overflow: 'visible' }}
          horizontal
        />
      </View>
    </View>
  ) : (
    <View />
  );
};

export default MovieDetailCastList;
