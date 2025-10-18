import { useCallback, useEffect } from 'react';
import { getConfiguration } from '@/services/imageConfiguration.ts';
import get from 'lodash/get';
import { updateConfig } from '@/stores/appConfigurationSlice.ts';
import { useDispatch } from 'react-redux';
import { convertImageConfig } from '@/utils/configUtil.ts';
import useAccountDetail from '@/hooks/useAccountDetail.ts';

interface IProps {
  onReadyToUse: () => void;
}

const useAppConfiguration = ({ onReadyToUse }: IProps) => {
  const dispatch = useDispatch();
  const { getAccountInformation, getWatchList } = useAccountDetail();

  const getConfig = useCallback(() => {
    getConfiguration()
      .then(response => {
        const data = get(response, 'data', null);
        const imageConfig = get(data, 'images', null);
        dispatch(updateConfig(convertImageConfig(imageConfig)));
      })
      .catch(() => {})
      .finally(() => {
        onReadyToUse();
      });
  }, [dispatch, onReadyToUse]);

  useEffect(() => {
    getConfig();
    getAccountInformation();
    getWatchList();
  }, []);
};

export default useAppConfiguration;
