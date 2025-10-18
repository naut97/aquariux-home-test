import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '@/apis/axiosInstance.ts';
import get from 'lodash/get';

interface IProps {
  path: string;
  formatData?: (data: any[]) => any;
  structuredData?: string;
  enabled?: boolean;
}

/**
 * A custom React hook for fetching and managing data from a given endpoint.
 *
 * @template T
 * @param {Object} props - The properties for configuring the data fetching behavior.
 * @param {string} props.path - The API endpoint path to fetch data from.
 * @param {function} [props.formatData] - An optional function to format the fetched data.
 * Defaults to an identity function.
 * @param {string} [props.structuredData] - The key within the API response object where the desired data is located.
 * Defaults to 'data'.
 * @param {boolean} [props.enabled] - A flag to determine if the data fetching operation should be enabled.
 * Defaults to true.
 * @returns {Object} An object containing the following:
 * - `data` (T | undefined): The fetched and optionally formatted data.
 * - `isLoading` (boolean): A flag indicating whether the data is currently being loaded.
 * - `isRefreshing` (boolean): A flag indicating whether the data is being refreshed.
 * - `onRefresh` (function): A function to manually trigger a refresh of the fetched data.
 */
const useFetchData = <T>(props: IProps) => {
  const {
    path,
    formatData = values => values,
    structuredData = 'data',
    enabled = true,
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<T>();

  const _getData = useCallback(() => {
    axiosInstance
      .get(path)
      .then(response => {
        const result = get(response, structuredData, []);
        setData(formatData(result));
      })
      .catch(error => {
        console.log('error', JSON.stringify(error));
      })
      .finally(() => {
        setIsLoading(false);
        setIsRefreshing(false);
      });
  }, [formatData, path, structuredData]);

  const onRefresh = () => {
    setIsRefreshing(true);
    _getData();
  };

  useEffect(() => {
    if (enabled) {
      _getData();
    }
  }, [enabled]);

  return {
    data,
    isLoading,
    isRefreshing,
    onRefresh,
  };
};

export default useFetchData;
