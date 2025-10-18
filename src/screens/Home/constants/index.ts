export enum MOVIE_GROUP {
  NOW_PLAYING = 'now-playing',
  UPCOMING = 'upcoming',
  POPULAR = 'popular',
}

export const MOVIE_GROUP_FILTER_DATA = [
  {
    value: MOVIE_GROUP.NOW_PLAYING,
    label: 'Now Playing',
  },
  {
    value: MOVIE_GROUP.UPCOMING,
    label: 'Upcoming',
  },
  {
    value: MOVIE_GROUP.POPULAR,
    label: 'Popular',
  },
];

export enum MOVIE_SORT_ITEM {
  O_TITLE_ASC = 'original_title.asc',
  RATING_DESC = 'vote_average.desc',
  RELEASE_DATE_ASC = 'primary_release_date.asc',
}

export const MOVIE_SORT_DATA = [
  {
    value: MOVIE_SORT_ITEM.O_TITLE_ASC,
    label: 'By alphabetical order',
  },
  {
    value: MOVIE_SORT_ITEM.RATING_DESC,
    label: 'By rating',
  },
  {
    value: MOVIE_SORT_ITEM.RELEASE_DATE_ASC,
    label: 'By release date',
  },
];
