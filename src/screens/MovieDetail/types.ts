import get from 'lodash/get';

export interface ICast {
  name: string;
  profilePath: string;
  character: string;
}

export interface IReview {
  id: string;
  name: string;
  username: string;
  avatarPath: string;
  content: string;
  createdAt: string;
  rating: number;
}

export interface IMovieKeyword {
  id: number;
  name: string;
}
