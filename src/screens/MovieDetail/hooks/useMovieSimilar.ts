import { MovieCardData } from '@/types/data.ts';
import ENDPOINTS from '@/apis/endpoints.ts';
import useInfinityFetchData from '@/hooks/useInfinityFetchData.ts';
import useFormatter from '@/hooks/useFormatter.ts';

interface IProps {
  movieId: number;
}

const useMovieSimilar = ({ movieId }: IProps) => {
  const { formatMovieCardDataList } = useFormatter();

  const { data } = useInfinityFetchData<MovieCardData>({
    path: ENDPOINTS.MOVIES.DETAIL.GET_SIMILAR.replace(
      '{movie_id}',
      movieId.toString(),
    ),
    formatData: formatMovieCardDataList,
  });

  return { similarMovies: data };
};

export default useMovieSimilar;
