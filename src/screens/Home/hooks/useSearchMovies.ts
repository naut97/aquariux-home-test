import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import { useCallback, useMemo, useState } from 'react';
import { MovieCardData } from '@/types/data.ts';
import useInfinityFetchData from '@/hooks/useInfinityFetchData.ts';
import ENDPOINTS from '@/apis/endpoints.ts';
import { MOVIE_GROUP, MOVIE_SORT_ITEM } from '@/screens/Home/constants';
import dayjs from 'dayjs';
import useFormatter from '@/hooks/useFormatter.ts';
import { updateHomeCategoryPersist } from '@/stores/persistSlice.ts';

const MOVIE_GROUP_MAPPING_ENDPOINT: Record<MOVIE_GROUP, any> = {
  [MOVIE_GROUP.NOW_PLAYING]: {
    path: ENDPOINTS.MOVIES.DISCOVER.MOVIE,
    additionalQuery: {
      'primary_release_date.lte': dayjs().add(20, 'day').format('YYYY-MM-DD'),
      'primary_release_date.gte': dayjs()
        .subtract(20, 'day')
        .format('YYYY-MM-DD'),
    },
  },
  [MOVIE_GROUP.POPULAR]: {
    path: ENDPOINTS.MOVIES.DISCOVER.MOVIE,
  },
  [MOVIE_GROUP.UPCOMING]: {
    path: ENDPOINTS.MOVIES.DISCOVER.MOVIE,
    additionalQuery: {
      'primary_release_date.gte': dayjs().add(1, 'day').format('YYYY-MM-DD'),
    },
  },
};

const useSearchMovies = () => {
  const persist = useSelector((state: any) => state.persist);
  const dispatch = useDispatch();
  const [movieGroup, setMovieGroup] = useState<string>(
    persist?.homeCategory ?? MOVIE_GROUP.NOW_PLAYING,
  );
  const [sortItem, setSortItem] = useState<string>(
    persist?.homeSort ?? MOVIE_SORT_ITEM.O_TITLE_ASC,
  );
  const { formatMovieCardDataList } = useFormatter();

  const onChangeMovieGroup = useCallback(
    (group: string) => {
      setMovieGroup(group);
      dispatch(updateHomeCategoryPersist(group));
    },
    [dispatch],
  );

  const onChangeMovieSortItem = useCallback(
    (value: string) => {
      setSortItem(value);
      dispatch(updateHomeCategoryPersist(value));
    },
    [dispatch],
  );

  const {
    data,
    keyword,
    onChangeKeyword,
    onLoadMore,
    onManualSearch,
    totalResults,
    isSearching,
  } = useInfinityFetchData<MovieCardData>({
    path: get(MOVIE_GROUP_MAPPING_ENDPOINT, [movieGroup, 'path']),
    formatData: formatMovieCardDataList,
    handleOnChange: false,
    additionQuery: {
      ...get(MOVIE_GROUP_MAPPING_ENDPOINT, [movieGroup, 'additionalQuery'], {}),
      sort_by: sortItem,
    },
  });

  const isHideLoadMoreButton = useMemo(() => {
    return totalResults === data.length;
  }, [data.length, totalResults]);

  return {
    searchResults: data,
    isHideLoadMoreButton,
    keyword,
    onChangeKeyword,
    onLoadMore,
    onChangeMovieGroup,
    movieGroup,
    onSearch: onManualSearch,
    sortItem,
    onChangeMovieSortItem,
    isSearching,
  };
};

export default useSearchMovies;
