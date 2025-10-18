import React, { useCallback } from 'react';
import CSpacing from '@/assets/styles/spacing.ts';
import Colors from '@/assets/colors.ts';
import { FlatList, View } from 'react-native';
import useMovieSimilar from '@/screens/MovieDetail/hooks/useMovieSimilar.ts';
import CText from '@/components/common/CText';
import { MovieCardData } from '@/types/data.ts';
import MovieCard from '@/components/biz/MovieCard';
import SCREEN_NAMES from '@/navigation/screens.ts';
import get from 'lodash/get';
import { useNavigation } from '@react-navigation/native';
import { NavigationTypes } from '@/navigation/types.ts';
import Localization from '@/utils/localization.ts';

interface IProps {
  movieId: number;
}

const MovieDetailSimilarMovies = ({ movieId }: IProps) => {
  const { similarMovies } = useMovieSimilar({ movieId });
  const navigation =
    useNavigation<NavigationTypes<SCREEN_NAMES.MOVIE_DETAIL>>();

  const onPressMovie = useCallback(
    (movie: MovieCardData) => {
      // @ts-ignore
      navigation.push(SCREEN_NAMES.MOVIE_DETAIL, {
        movieId: get(movie, 'id'),
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: MovieCardData; index: number }) => {
      return (
        <MovieCard
          data={item}
          key={`MOVIE_CARD_${index}`}
          onPressMovie={onPressMovie}
          options={{
            withHorizontalList: true,
          }}
        />
      );
    },
    [onPressMovie],
  );

  return (
    <View
      style={{
        paddingTop: CSpacing.m,
        paddingHorizontal: CSpacing.m,
        backgroundColor: Colors.primaryBackgroundColor,
      }}
    >
      <View>
        <CText.H4>{Localization.t('MOVIE.RECOMMENDATION')}</CText.H4>
      </View>

      <FlatList
        data={similarMovies}
        horizontal
        style={{ overflow: 'visible' }}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: CSpacing.m,
          paddingBottom: CSpacing.l,
          overflow: 'visible',
          columnGap: CSpacing.m,
        }}
      />
    </View>
  );
};

export default MovieDetailSimilarMovies;
