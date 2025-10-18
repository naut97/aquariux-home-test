import { useCallback } from 'react';
import { MovieCardData } from '@/types/data.ts';
import { getDateFromString } from '@/utils/dateUtil.ts';
import get from 'lodash/get';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const useFormatter = () => {
  const appConfiguration = useSelector((state: any) => state.appConfiguration);
  const config = get(appConfiguration, 'imageConfig.mobile', null);

  const formatMovieCardDataList = useCallback(
    (list: any): MovieCardData[] => {
      console.log(list);
      return list.map((item: any) => {
        const releaseDateInfo = getDateFromString(
          get(item, 'release_date', ''),
        );
        const formattedReleaseDate = dayjs(
          `${releaseDateInfo.year}-${releaseDateInfo.month}-${releaseDateInfo.day}`,
          `YYYY-MM-DD`,
        ).format(`DD MMM YYYY`);

        const releaseDateInUnix = dayjs(
          `${releaseDateInfo.year}-${releaseDateInfo.month}-${releaseDateInfo.day}`,
          `YYYY-MM-DD`,
        ).unix();

        return {
          title: get(item, 'title', ''),
          thumbnail: `${get(config, 'posterUrl', '')}${get(
            item,
            'poster_path',
            '',
          )}`,
          overview: get(item, 'overview', ''),
          rating: get(item, 'vote_average', 0),
          releaseDate: formattedReleaseDate,
          releaseDateInUnix,
          id: get(item, 'id', 0),
        };
      });
    },
    [config],
  );

  const formatMovieDetail = useCallback(
    (data: any) => {
      const backdropUrl = get(config, 'backdropUrl', '');
      const posterUrl = get(config, 'posterUrl', '');
      const backdropPath = get(data, 'backdrop_path', '');
      const posterPath = get(data, 'poster_path', '');
      const title = get(data, 'title', '');
      const rating = get(data, 'vote_average', 0);
      const runtime = get(data, 'runtime', 0);
      const tagline = get(data, 'tagline', 0);
      const releaseDate = get(data, 'release_date', '');
      const overview = get(data, 'overview', '');
      const formattedReleaseDate = dayjs(releaseDate, 'YYYY-MM-DD').format(
        'DD/MM/YYYY',
      );
      const isReleased = dayjs(releaseDate, 'YYYY-MM-DD').isBefore(dayjs());
      const originalLanguageId = get(data, 'original_language', '');
      const spokenLanguages = get(data, 'spoken_languages', []);
      const originalLanguage = spokenLanguages.find(
        (lang: any) => lang.iso_639_1 === originalLanguageId,
      );

      return {
        backdropImage: `${backdropUrl}${backdropPath}`,
        posterImage: `${posterUrl}${posterPath}`,
        title: title,
        rating: rating,
        runtime: runtime,
        tagline: tagline,
        releaseYear: getDateFromString(releaseDate).year,
        releaseDate: formattedReleaseDate,
        releaseStatus: isReleased ? 'Released' : 'Coming Soon',
        overview: overview,
        originalLanguage: originalLanguage ? originalLanguage.english_name : '',
        genres: get(data, 'genres', [])
          .map((genre: any) => genre.name)
          .join(', '),
        id: get(data, 'id', 0),
      };
    },
    [config],
  );

  const formatCrewList = useCallback(
    (data: any[]) => {
      const profileUrl = get(config, 'profileUrl', '');
      return data.map((cast: any) => ({
        name: get(cast, 'name', ''),
        character: get(cast, 'character', ''),
        job: get(cast, 'job', ''),
        profilePath: `${profileUrl}${get(cast, 'profile_path', '')}`,
      }));
    },
    [config],
  );

  return { formatMovieCardDataList, formatMovieDetail, formatCrewList };
};

export default useFormatter;
