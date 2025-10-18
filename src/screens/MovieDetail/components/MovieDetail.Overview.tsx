import React, { useCallback, useMemo, useState } from 'react';
import CSpacing from '@/assets/styles/spacing.ts';
import { TouchableOpacity, View, Image } from 'react-native';
import { MovieDetailData } from '@/types/data.ts';
import CText from '@/components/common/CText';
import Colors from '@/assets/colors.ts';
import Common from '@/assets/styles/common.ts';
import get from 'lodash/get';
import UserScoreCard from '@/screens/MovieDetail/components/MovieDetail.Score.tsx';
import _ from 'lodash';
import Icons from '@/assets/icon';
import CRadius from '@/assets/styles/radius.ts';
import useAccountDetail from '@/hooks/useAccountDetail.ts';
import { useSelector } from 'react-redux';
import Localization from '@/utils/localization.ts';

interface IProps {
  movie: MovieDetailData;
  crewData?: any[];
}

const MovieDetailOverview = ({ movie, crewData = [] }: IProps) => {
  const watchList = useSelector((state: any) => state.account.watchList);

  const watchListStatus = get(watchList, get(movie, 'id', 0));
  const [isAdded, setIsAdded] = useState<boolean>(!!watchListStatus);
  const { addMovieToWatchList } = useAccountDetail();

  const tagline = get(movie, 'tagline');
  const crewList = crewData.filter(
    item => item.job && (item.job === 'Director' || item.job === 'Writer'),
  );

  const groupedByName = _.groupBy(crewList, 'name');

  const formattedCrewList = useMemo(() => {
    return Object.entries(groupedByName).map(([key, values]) => ({
      name: key,
      job: values.map(item => item.job).join(', '),
    }));
  }, [groupedByName]);

  const onPressAddWatchList = useCallback(() => {
    const result = addMovieToWatchList({
      movieId: get(movie, 'id', 0),
      isAdd: !isAdded,
    });

    setIsAdded(result);
  }, [addMovieToWatchList, movie, isAdded]);

  return (
    <View
      style={{
        padding: CSpacing.s29,
      }}
    >
      <View style={[Common.row, Common.jBetween]}>
        <View style={[Common.flex]}>
          <UserScoreCard score={(get(movie, 'rating', 0) / 10) * 100} />
          <CText.H4 color={Colors.white} style={{ paddingTop: CSpacing.s }}>
            User Score
          </CText.H4>
        </View>
        <View style={[Common.jBetween, Common.flex]}>
          {formattedCrewList.slice(0, 2).map((item, index) => (
            <View key={`CREW_${index}`}>
              <CText.H5 color={Colors.white}>{item.name}</CText.H5>
              <CText.BodyRegular color={Colors.white}>
                {item.job}
              </CText.BodyRegular>
            </View>
          ))}
        </View>
      </View>
      {tagline ? (
        <View style={{ paddingVertical: CSpacing.s29 }}>
          <CText typo={'h4_light_italic'} color={Colors.white}>
            {tagline}
          </CText>
        </View>
      ) : null}
      <View style={{ paddingTop: tagline ? CSpacing.zero : CSpacing.l }}>
        <CText.H4 color={Colors.white}>
          {Localization.t('MOVIE.OVERVIEW')}
        </CText.H4>
        <CText.BodyRegular
          color={Colors.white}
          style={{ paddingTop: CSpacing.s }}
        >
          {get(movie, 'overview')}
        </CText.BodyRegular>
      </View>
      <TouchableOpacity
        style={[
          Common.rowHCenter,
          {
            marginTop: CSpacing.s,
            columnGap: CSpacing.s,
            borderRadius: CRadius.l,
            borderColor: Colors.white,
            borderWidth: 1,
            alignSelf: 'flex-start',
            padding: CSpacing.s,
          },
        ]}
        onPress={onPressAddWatchList}
      >
        <Image
          source={Icons.ic_watchlist}
          style={{ height: 20, resizeMode: 'contain' }}
        />
        <CText.H5 color={Colors.white}>
          {Localization.t(
            isAdded ? 'MOVIE.REMOVE_FROM_WATCHLIST' : 'MOVIE.ADD_TO_WATCHLIST',
          )}
        </CText.H5>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetailOverview;
