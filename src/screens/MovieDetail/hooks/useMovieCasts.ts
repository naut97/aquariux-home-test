import { ICast } from '@/screens/MovieDetail/types.ts';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import ENDPOINTS from '@/apis/endpoints.ts';
import useFetchData from '@/hooks/useFetchData.ts';

interface IProps {
  movieId: number;
}

const useMovieCasts = ({ movieId }: IProps) => {
  const config = useSelector(state =>
    get(state, ['appConfiguration', 'imageConfig', 'mobile'], null),
  );

  const formatCasts = (data: any[]) => {
    const profileUrl = get(config, 'profileUrl', '');
    return data.map((cast: any) => ({
      name: get(cast, 'name', ''),
      character: get(cast, 'character', ''),
      known_for_department: get(cast, 'known_for_department', ''),
      profilePath: `${profileUrl}${get(cast, 'profile_path', '')}`,
    }));
  };

  const { data = [] } = useFetchData<ICast[]>({
    path: ENDPOINTS.MOVIES.DETAIL.GET_ACTORS.replace(
      '{movie_id}',
      movieId.toString(),
    ),
    formatData: formatCasts,
    structuredData: 'data.cast',
  });

  return {
    data: data,
  };
};

export default useMovieCasts;
