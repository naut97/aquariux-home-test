import { API_VERSION } from '@env';

const getVersion = (path: string) => `${API_VERSION}/${path}`;

const ENDPOINTS = {
  AUTH: {
    GET_AUTHENTICATION: getVersion('authentication'),
  },
  CONFIGURATION: {
    IMAGE: getVersion('configuration'),
  },
  MOVIES: {
    RECOMMENDATION: {
      GET_POPULAR: getVersion('movie/popular'),
      GET_TOP_RATED: getVersion('movie/top_rated'),
      GET_UPCOMING: getVersion('movie/upcoming'),
      GET_NOW_PLAYING: getVersion('movie/now_playing'),
    },
    DETAIL: {
      GET_DETAIL: getVersion('movie/{movie_id}'),
      GET_SIMILAR: getVersion('movie/{movie_id}/similar'),
      GET_ACTORS: getVersion('movie/{movie_id}/credits'),
      GET_REVIEWS: getVersion('movie/{movie_id}/reviews'),
      GET_KEYWORDS: getVersion('movie/{movie_id}/keywords'),
      GET_RELEASE_DATES: getVersion('movie/{movie_id}/release_dates'),
    },
    DISCOVER: {
      MOVIE: getVersion('discover/movie'),
    },
  },
  SEARCH: {
    MOVIE: getVersion('search/movie'),
    KEYWORD: getVersion('search/keyword'),
  },
  ACCOUNT: {
    GET_MY_WATCH_LIST: getVersion('account/null/watchlist/movies'),
    ADD_MY_WATCH_LIST: getVersion('account/null/watchlist'),
    MY_DETAIL: getVersion('account/null'),
  },
};

export default ENDPOINTS;
