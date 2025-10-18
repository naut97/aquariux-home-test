import axiosInstance from '@/apis/axiosInstance.ts';
import ENDPOINTS from '@/apis/endpoints.ts';

export const authenticateApp = () =>
  axiosInstance.get(ENDPOINTS.AUTH.GET_AUTHENTICATION);

export const getAccountDetail = () =>
  axiosInstance.get(ENDPOINTS.ACCOUNT.MY_DETAIL);

export const getAccountWatchList = () =>
  axiosInstance.get(ENDPOINTS.ACCOUNT.GET_MY_WATCH_LIST);

export const addToWatchList = (body: any) =>
  axiosInstance.post(ENDPOINTS.ACCOUNT.ADD_MY_WATCH_LIST, body);
