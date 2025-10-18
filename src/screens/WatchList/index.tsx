import React, { useCallback } from 'react';
import SafeScreen from '@/components/layout/SafeScreen';
import WatchlistHeader from '@/screens/WatchList/components/Watchlist.Header.tsx';
import CSpacing from '@/assets/styles/spacing.ts';
import { Pressable, View, Image, FlatList } from 'react-native';
import CText from '@/components/common/CText';
import Common from '@/assets/styles/common.ts';
import CInlineDropdown from '@/components/common/CInlineDropdown';
import { WATCHLIST_SORT_DATA } from '@/screens/WatchList/constants';
import Icons from '@/assets/icon';
import { MovieCardData } from '@/types/data.ts';
import SCREEN_NAMES from '@/navigation/screens.ts';
import get from 'lodash/get';
import MovieCard from '@/components/biz/MovieCard';
import { useNavigation } from '@react-navigation/native';
import { NavigationTypes } from '@/navigation/types.ts';
import useAccountDetail from '@/hooks/useAccountDetail.ts';
import CButton from '@/components/common/CButton';
import useWatchListFilter from '@/screens/WatchList/hooks/useWatchListFilter.ts';
import Localization from '@/utils/localization.ts';

const WatchList = () => {
  const navigation = useNavigation<NavigationTypes<SCREEN_NAMES.WATCH_LIST>>();
  const { addMovieToWatchList } = useAccountDetail();
  const { data, isAsc, setIsAsc, sort, setSort } = useWatchListFilter();

  const onPressMovie = useCallback(
    (movie: MovieCardData) => {
      navigation.navigate(SCREEN_NAMES.MOVIE_DETAIL, {
        movieId: get(movie, 'id'),
      });
    },
    [navigation],
  );

  const onPressRemoveFromWatchList = useCallback(
    (data: MovieCardData) => {
      addMovieToWatchList({
        movieId: get(data, 'id', 0),
        isAdd: false,
      });
    },
    [addMovieToWatchList],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: MovieCardData; index: number }) => {
      return (
        <MovieCard
          data={item}
          key={`MOVIE_CARD_${index}`}
          onPressMovie={onPressMovie}
          options={{
            showRemoveButton: true,
          }}
          onPressRemove={onPressRemoveFromWatchList}
        />
      );
    },
    [onPressMovie, onPressRemoveFromWatchList],
  );

  const navigateToHomeScreen = useCallback(() => {
    navigation.navigate(SCREEN_NAMES.HOME);
  }, [navigation]);

  const ListEmptyComponent = useCallback(() => {
    return (
      <View
        style={[
          Common.itemXYCenter,
          { rowGap: CSpacing.m, padding: CSpacing.m },
        ]}
      >
        <CText.BodyRegular style={Common.textCenter}>
          Nothing here yet! Explore and add some titles to your watchlist.
        </CText.BodyRegular>
        <CButton label={'Explore now'} onPress={navigateToHomeScreen} />
      </View>
    );
  }, [navigateToHomeScreen]);

  return (
    <SafeScreen punchTop isBottomScreen>
      <WatchlistHeader />
      <View style={{ padding: CSpacing.s29 }}>
        <CText.H5>{Localization.t('WATCHLIST.TITLE')}</CText.H5>
        <View
          style={[
            Common.rowHCenter,
            { marginTop: CSpacing.m, columnGap: CSpacing.s },
          ]}
        >
          <CText.BodyRegular color={'#999999'}>
            {Localization.t('WATCHLIST.FILTER_BY')}
          </CText.BodyRegular>
          <CInlineDropdown
            data={WATCHLIST_SORT_DATA}
            value={sort}
            onChange={setSort}
          />
          <CText.BodyRegular color={'#999999'}>
            {Localization.t('WATCHLIST.ORDER')}
          </CText.BodyRegular>
          <Pressable
            hitSlop={Common.hitslop}
            onPress={setIsAsc.bind(null, !isAsc)}
          >
            <Image
              source={Icons.ic_asc_arrow}
              style={{
                height: 15,
                resizeMode: 'contain',
                transform: [{ rotate: isAsc ? '180deg' : '0deg' }],
              }}
            />
          </Pressable>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        style={{ overflow: 'hidden', paddingVertical: CSpacing.m }}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{
          paddingHorizontal: CSpacing.m,
          rowGap: CSpacing.m,
          overflow: 'visible',
        }}
      />
    </SafeScreen>
  );
};

export default WatchList;
