import useFormatter from '@/hooks/useFormatter.ts';
import useAccountDetail from '@/hooks/useAccountDetail.ts';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { WATCHLIST_SORT_ITEM } from '@/screens/WatchList/constants';
import { orderBy } from 'lodash';

const useWatchListFilter = () => {
  const watchList = useSelector((state: any) => state.account.watchList);
  const [sort, setSort] = useState<string>(WATCHLIST_SORT_ITEM.O_TITLE);
  const [isAsc, setIsAsc] = useState<boolean>(true);

  const { formatMovieCardDataList } = useFormatter();
  const data = useMemo(() => {
    const list = formatMovieCardDataList(Object.values(watchList));

    if (sort === WATCHLIST_SORT_ITEM.O_TITLE) {
      return orderBy(list, ['title'], [isAsc ? 'asc' : 'desc']);
    } else if (sort === WATCHLIST_SORT_ITEM.RATING) {
      return orderBy(list, ['rating'], [isAsc ? 'asc' : 'desc']);
    } else if (sort === WATCHLIST_SORT_ITEM.RELEASE_DATE) {
      return orderBy(list, ['releaseDateInUnix'], [isAsc ? 'asc' : 'desc']);
    } else {
      return list;
    }
  }, [formatMovieCardDataList, watchList, sort, isAsc]);

  return {
    data,
    sort,
    setSort,
    isAsc,
    setIsAsc,
  };
};

export default useWatchListFilter;
