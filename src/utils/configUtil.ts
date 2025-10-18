import get from 'lodash/get';

export const convertImageConfig = (config: any) => {
  const baseUrl = get(config, 'secure_base_url', '');
  const posterSizes = get(config, 'poster_sizes', []);
  const backdropSizes = get(config, 'backdrop_sizes', []);
  const profileSizes = get(config, 'profile_sizes', []);
  const posterMobileSize = get(posterSizes, [2], '');
  const backdropMobileSize = get(backdropSizes, [2], '');
  const profileMobileSize = get(profileSizes, [2], '');

  return {
    mobile: {
      posterUrl: `${baseUrl}${posterMobileSize}`,
      backdropUrl: `${baseUrl}${backdropMobileSize}`,
      profileUrl: `${baseUrl}${profileMobileSize}`,
    },
  };
};
