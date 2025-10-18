import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '@/apis/axiosInstance.ts';
import get from 'lodash/get';
import { debounce } from 'lodash';
import useUpdateEffect from '@/hooks/useUpdateEffect.ts';
import Endpoints from '@/apis/endpoints.ts';

interface IProps {
  path: string;
  formatData?: (data: any[]) => any;
  limit?: number;
  handleOnChange?: boolean;
  additionQuery?: any;
}

const useInfinityFetchData = <T>(props: IProps) => {
  const {
    path,
    formatData = values => values,
    limit = 12,
    handleOnChange = false,
    additionQuery = {},
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>('');
  const [data, setData] = useState<T[]>([]);

  const _getData = useCallback(
    async (currentPage: number = 1) => {
      setIsSearching(true);
      const keywordIds: number[] = [];
      if (keyword) {
        const kwRs = await axiosInstance.get(Endpoints.SEARCH.KEYWORD, {
          params: {
            query: keyword,
            language: 'us-US',
            region: 'US',
          },
        });
        const kwData = get(kwRs, 'data.results', []);
        if (kwData) {
          kwData.forEach((item: any) => {
            keywordIds.push(item.id);
          });
        }
      }

      axiosInstance
        .get(path, {
          params: {
            language: 'us-US',
            region: 'US',
            page: currentPage,
            limit,
            with_keywords: keywordIds.join('|'),
            ...additionQuery,
          },
        })
        .then(response => {
          console.log('response', response);
          const results = get(response, 'data.results', []);
          const limitPage = get(response, 'data.total_pages', 1);
          if (currentPage < limitPage) {
            setPage(currentPage + 1);
          }

          if (currentPage === 1) {
            setData(formatData(results));
          } else {
            setData(prev => prev.concat(formatData(results)));
          }

          setTotalResults(get(response, 'data.total_results', 1));
          setTotalPages(limitPage);
        })
        .catch(error => {
          console.log('error', error);
        })

        .finally(() => {
          setIsLoading(false);
          setIsRefreshing(false);
          setIsSearching(false);
        });
    },
    [path, keyword, limit, formatData, additionQuery],
  );

  const onLoadMore = useCallback(() => {
    if (page < totalPages) {
      _getData(page);
    }
  }, [_getData, totalPages, page]);

  const onRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    _getData();
  };

  const onChangeKeyword = useCallback((text: string) => {
    setPage(1);
    setKeyword(text);
  }, []);

  const onChangeKeywordDebounce = debounce(onChangeKeyword, 400);

  const onManualSearch = useCallback(() => {
    if (!handleOnChange) {
      setPage(1);
      setData([]);
      _getData(1);
    }
  }, [_getData, handleOnChange]);

  useUpdateEffect(() => {
    if (handleOnChange) {
      _getData();
    }
  }, [keyword, handleOnChange]);

  useEffect(() => {
    _getData();
  }, []);

  return {
    data,
    totalResults,
    isLoading,
    isRefreshing,
    onLoadMore,
    onRefresh,
    onChangeKeyword: onChangeKeywordDebounce,
    keyword,
    isSearching,
    onManualSearch,
  };
};

export default useInfinityFetchData;
