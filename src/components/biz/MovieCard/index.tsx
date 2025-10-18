import React, { useCallback } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { MovieCardData } from '@/types/data.ts';
import get from 'lodash/get';
import CText from '@/components/common/CText';
import CRadius from '@/assets/styles/radius.ts';
import CSpacing from '@/assets/styles/spacing.ts';
import Common from '@/assets/styles/common.ts';
import Icons from '@/assets/icon';
import AppDimensions from '@/assets/styles/dimens.ts';
import Colors from '@/assets/colors.ts';

interface IMovieCardProps {
  data: MovieCardData;
  onPressMovie: (data: MovieCardData) => void;
  onPressRemove?: (data: MovieCardData) => void;
  options?: {
    showRemoveButton?: boolean;
    withHorizontalList?: boolean;
  };
}

const MovieCard = ({
  data,
  onPressMovie,
  options,
  onPressRemove,
}: IMovieCardProps) => {
  const { showRemoveButton = false, withHorizontalList = false } =
    options || {};

  const onPress = useCallback(() => {
    onPressMovie(data);
  }, [onPressMovie, data]);

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        withHorizontalList && { width: AppDimensions.windowWidth * 0.8 },
      ]}
      onPress={onPress}
    >
      <View style={[Common.rowHCenter, { overflow: 'hidden' }]}>
        <Image
          source={{ uri: get(data, 'thumbnail', '') }}
          style={styles.poster}
          resizeMode={'cover'}
        />
        <View style={styles.movieInfo}>
          <View>
            <CText typo={'h5'}>{get(data, 'title', '')}</CText>
            <CText.BodyRegular color={'#999999'}>
              {get(data, 'releaseDate', '')}
            </CText.BodyRegular>
          </View>
          <View style={{ paddingTop: CSpacing.l }}>
            <CText.BodyRegular numberOfLines={2} style={Common.shrink}>
              {get(data, 'overview', '')}
            </CText.BodyRegular>
          </View>
        </View>
        {showRemoveButton && (
          <Pressable
            hitSlop={Common.hitslop}
            onPress={onPressRemove?.bind(null, data)}
            style={{ position: 'absolute', top: CSpacing.s, right: CSpacing.m }}
          >
            <Image
              source={Icons.ic_x}
              style={{ height: 24, resizeMode: 'contain' }}
            />
          </Pressable>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: CRadius.l,
    ...Common.shadow,
  },
  poster: {
    width: 96,
    height: 141,
    borderTopLeftRadius: CRadius.l,
    borderBottomLeftRadius: CRadius.l,
    backgroundColor: Colors.neutral_7,
  },
  movieInfo: {
    padding: CSpacing.s,
    justifyContent: 'space-between',
    flex: 1,
  },
  ratingAndReleaseYear: {},
  rating: { flexDirection: 'row', alignItems: 'center' },
});

export default MovieCard;
