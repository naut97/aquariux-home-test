import React from 'react';
import Common from '@/assets/styles/common.ts';
import CSpacing from '@/assets/styles/spacing.ts';
import { TouchableOpacity, View } from 'react-native';
import * as SolidIcons from 'react-native-heroicons/solid';
import Colors from '@/assets/colors.ts';
import { ICON_SIZE } from '@/assets/styles/images.ts';
import CText from '@/components/common/CText';
import get from 'lodash/get';
import { useNavigation } from '@react-navigation/native';
import { NavigationTypes } from '@/navigation/types.ts';
import SCREEN_NAMES from '@/navigation/screens.ts';
import { useSelector } from 'react-redux';

const WatchlistHeader = () => {
  const accountInfo = useSelector((state: any) => state.account.info);
  const navigation = useNavigation<NavigationTypes<SCREEN_NAMES.WATCH_LIST>>();
  const name =
    get(accountInfo, 'name', '') || get(accountInfo, 'username', 'U');

  return (
    <View style={{ backgroundColor: Colors.dark_blue }}>
      <View
        style={[
          Common.rowHCenter,
          Common.jBetween,
          { paddingVertical: CSpacing.s, backgroundColor: Colors.dark_blue },
        ]}
      >
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{
            borderRadius: 25,
            padding: CSpacing.xs,
          }}
        >
          <SolidIcons.ChevronLeftIcon color={Colors.white} size={ICON_SIZE} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          Common.rowHCenter,
          { padding: CSpacing.l, columnGap: CSpacing.s },
        ]}
      >
        <View
          style={[
            Common.itemXYCenter,
            {
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: Colors.primaryControlColor,
            },
          ]}
        >
          <CText.H4 color={Colors.white}>
            {name.slice(0, 1).toUpperCase()}
          </CText.H4>
        </View>
        <View>
          <CText.BodySemiBold color={Colors.white}>{name}</CText.BodySemiBold>
        </View>
      </View>
    </View>
  );
};

export default WatchlistHeader;
