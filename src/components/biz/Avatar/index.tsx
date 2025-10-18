import React from 'react';
import get from 'lodash/get';
import {Image, View} from 'react-native';
import CText from '@/components/common/CText';
import Colors from '@/assets/colors.ts';

interface IProps {
  path: string;
  altText: string;
}

const Avatar = ({path, altText = 'C'}: IProps) => {
  if (!path) {
    return (
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: Colors.primaryIconColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CText.BodyRegular>{altText[0]}</CText.BodyRegular>
      </View>
    );
  }

  return (
    <Image
      source={{uri: path}}
      style={{width: 40, height: 40, borderRadius: 20}}
    />
  );
};

export default Avatar;
