import get from 'lodash/get';
import { MovieDetailData } from '@/types/data.ts';
import useFetchData from '@/hooks/useFetchData.ts';
import ENDPOINTS from '@/apis/endpoints.ts';
import useFormatter from '@/hooks/useFormatter.ts';

const useMovieDetail = ({ movieId }: { movieId: number }) => {
  const { formatMovieDetail, formatCrewList } = useFormatter();

  const formatReleaseDates = (data: any) => {
    const releaseDates = get(data, 'results', []);
    const usCerts = releaseDates.find((date: any) => date.iso_3166_1 === 'US');
    const usCert = get(usCerts, 'release_dates[0].certification', '');

    return {
      certification: usCert,
    };
  };

  const { data: releaseData } = useFetchData<MovieDetailData>({
    path: ENDPOINTS.MOVIES.DETAIL.GET_RELEASE_DATES.replace(
      '{movie_id}',
      movieId.toString(),
    ),
    formatData: formatReleaseDates,
    structuredData: 'data',
  });

  const { data, onRefresh, isRefreshing } = useFetchData<MovieDetailData>({
    path: ENDPOINTS.MOVIES.DETAIL.GET_DETAIL.replace(
      '{movie_id}',
      movieId.toString(),
    ),
    formatData: formatMovieDetail,
    structuredData: 'data',
  });

  const { data: crewData } = useFetchData<any[]>({
    path: ENDPOINTS.MOVIES.DETAIL.GET_ACTORS.replace(
      '{movie_id}',
      movieId.toString(),
    ),
    formatData: formatCrewList,
    structuredData: 'data.crew',
  });

  return { movie: data, releaseData, onRefresh, isRefreshing, crewData };
};

export default useMovieDetail;
