export enum WATCHLIST_SORT_ITEM {
  O_TITLE = 'original_title',
  RATING = 'vote_average',
  RELEASE_DATE = 'primary_release_date',
}

export const WATCHLIST_SORT_DATA = [
  {
    value: WATCHLIST_SORT_ITEM.O_TITLE,
    label: 'Alphabetical',
  },
  {
    value: WATCHLIST_SORT_ITEM.RATING,
    label: 'Rating',
  },
  {
    value: WATCHLIST_SORT_ITEM.RELEASE_DATE,
    label: 'Release Date',
  },
];
