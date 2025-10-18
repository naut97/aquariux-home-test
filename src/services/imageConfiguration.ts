import axiosInstance from '@/apis/axiosInstance.ts';
import ENDPOINTS from '@/apis/endpoints.ts';

export const getConfiguration = () =>
  axiosInstance.get(ENDPOINTS.CONFIGURATION.IMAGE);
