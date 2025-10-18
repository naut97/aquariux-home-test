import React, { useCallback } from 'react';
import CInput from '@/components/common/CInput';
import CSpacing from '@/assets/styles/spacing.ts';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import Localization from '@/utils/localization.ts';
import useSearchMovies from '@/screens/Home/hooks/useSearchMovies.ts';
import SafeScreen from '@/components/layout/SafeScreen';
import CDropdown from '@/components/common/CDropdown';
import CButton from '@/components/common/CButton';
import {
  MOVIE_GROUP_FILTER_DATA,
  MOVIE_SORT_DATA,
} from '@/screens/Home/constants';
import MovieCard from '@/components/biz/MovieCard';
import { MovieCardData } from '@/types/data.ts';
import CText from '@/components/common/CText';
import Common from '@/assets/styles/common.ts';
import { useNavigation } from '@react-navigation/native';
import SCREEN_NAMES from '@/navigation/screens.ts';
import get from 'lodash/get';
import { NavigationTypes } from '@/navigation/types';

const Home = () => {
  const {
    searchResults,
    onChangeKeyword,
    onLoadMore,
    onChangeMovieGroup,
    movieGroup,
    onSearch,
    onChangeMovieSortItem,
    sortItem,
    isHideLoadMoreButton,
    isSearching,
  } = useSearchMovies();
  const navigation =
    useNavigation<NavigationTypes<SCREEN_NAMES.MOVIE_DETAIL>>();

  const onPressMovie = useCallback(
    (movie: MovieCardData) => {
      navigation.navigate(SCREEN_NAMES.MOVIE_DETAIL, {
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
        />
      );
    },
    [onPressMovie],
  );

  return (
    <SafeScreen punchTop isBottomScreen>
      <ScrollView>
        <View style={styles.filterContainer}>
          <CDropdown
            value={movieGroup}
            onChange={onChangeMovieGroup}
            data={MOVIE_GROUP_FILTER_DATA}
          />
          <CDropdown
            placeholder={Localization.t('SEARCH.SORT_BY')}
            data={MOVIE_SORT_DATA}
            value={sortItem}
            onChange={onChangeMovieSortItem}
          />
          <CInput
            placeholder={Localization.t('SEARCH.INPUT_PLACEHOLDER')}
            onChangeText={onChangeKeyword}
          />
          <CButton
            label={Localization.t('SEARCH.SUBMIT_BUTTON')}
            type={'primary'}
            onPress={onSearch}
            buttonStyle={{ borderRadius: 100 }}
          />
        </View>
        <FlatList
          disableVirtualization={true}
          style={{ overflow: 'visible' }}
          scrollEnabled={false}
          contentContainerStyle={{
            paddingHorizontal: CSpacing.m,
            rowGap: CSpacing.m,
            overflow: 'visible',
          }}
          data={searchResults}
          renderItem={renderItem}
        />
        {!isSearching && (
          <View style={styles.loadmoreView}>
            {isHideLoadMoreButton ? (
              <CText.BodyRegular style={Common.textCenter}>
                {Localization.t('SEARCH.END_OF_RESULTS')}
              </CText.BodyRegular>
            ) : (
              <CButton
                label={Localization.t('SEARCH.LOAD_MORE')}
                onPress={onLoadMore}
              />
            )}
          </View>
        )}
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: CSpacing.m,
    marginVertical: CSpacing.s,
    rowGap: CSpacing.l,
    paddingBottom: CSpacing.s,
  },
  loadmoreView: {
    padding: CSpacing.m,
  },
});

export default Home;
