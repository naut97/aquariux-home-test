import React from 'react';
import { View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types.ts';
import SCREEN_NAMES from '@/navigation/screens.ts';
import useMovieDetail from '@/screens/MovieDetail/hooks/useMovieDetail.ts';
import CFlex from '@/components/layout/CFlex.tsx';
import Colors from '@/assets/colors.ts';
import MovieDetailHeader from '@/screens/MovieDetail/components/MovieDetail.Header.tsx';
import MovieDetailCastList from '@/screens/MovieDetail/components/MovieDetail.CastList.tsx';
import MovieDetailOverview from '@/screens/MovieDetail/components/MovieDetail.Overview.tsx';
import MovieDetailInformation from '@/screens/MovieDetail/components/MovieDetail.Information.tsx';
import SafeScreen from '@/components/layout/SafeScreen';
import Common from '@/assets/styles/common.ts';
import MovieDetailSimilarMovies from '@/screens/MovieDetail/components/MovieDetail.SimilarMovies.tsx';
import get from 'lodash/get';

const MovieDetail = () => {
  const {
    params: { movieId },
  } = useRoute<RouteProp<RootStackParamList, SCREEN_NAMES.MOVIE_DETAIL>>();

  const { movie, onRefresh, isRefreshing, releaseData, crewData } =
    useMovieDetail({
      movieId: movieId,
    });

  return (
    <SafeScreen punchTop isLoading={!movie}>
      {movie ? (
        <View
          style={[Common.flex, { backgroundColor: Colors.primaryControlColor }]}
        >
          <MovieDetailHeader movie={movie} />
          <CFlex
            noEdges
            scrollable
            onRefresh={onRefresh}
            isRefreshing={isRefreshing}
          >
            <MovieDetailInformation movie={movie} releaseData={releaseData} />
            <MovieDetailOverview movie={movie} crewData={crewData} />
            <MovieDetailCastList movie={movie} />
            <MovieDetailSimilarMovies movieId={get(movie, 'id', 0)} />
          </CFlex>
        </View>
      ) : null}
    </SafeScreen>
  );
};

export default MovieDetail;
