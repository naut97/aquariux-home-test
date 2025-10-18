import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchList, getAccountDetail } from '@/services/authentication.ts';
import { updateAccount, updateWatchList } from '@/stores/accountSlice.ts';
import axiosInstance from '@/apis/axiosInstance.ts';
import ENDPOINTS from '@/apis/endpoints.ts';
import _ from 'lodash';
import get from 'lodash/get';
import CAlertProvider from '@/components/common/CAlert';
import Localization from '@/utils/localization.ts';

const useAccountDetail = () => {
  const account = useSelector((state: any) => state.account);

  const dispatch = useDispatch();

  const getAccountInformation = useCallback(() => {
    getAccountDetail().then(response => {
      const data = response.data;
      dispatch(updateAccount(data));
    });
  }, [dispatch]);

  const getWatchList = useCallback(() => {
    if (account) {
      axiosInstance.get(ENDPOINTS.ACCOUNT.GET_MY_WATCH_LIST).then(response => {
        const data = get(response, 'data.results', []);
        const watchList = data.reduce(
          (a: any, b: any) => ({ ...a, [b.id]: b }),
          {},
        );
        dispatch(updateWatchList(watchList));
      });
    }
  }, [account, dispatch]);

  const addMovieToWatchList = useCallback(
    ({ movieId, isAdd }: { movieId: number; isAdd: boolean }) => {
      const body = {
        media_type: 'movie',
        media_id: movieId,
        watchlist: isAdd,
      };
      addToWatchList(body).then(() => {
        getWatchList();
        CAlertProvider.showAlert({
          title: Localization.t(
            isAdd ? 'MOVIE.REMOVED_TO_WATCHLIST' : 'MOVIE.ADDED_TO_WATCHLIST',
          ),
          type: 'success',
        });
      });
      return isAdd;
    },
    [getWatchList],
  );

  return { getAccountInformation, getWatchList, addMovieToWatchList };
};

export default useAccountDetail;
