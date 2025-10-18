import React, { useCallback, useEffect, useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  ViewProps,
  TextInputProps,
} from 'react-native';
import Localization from '@/utils/localization.ts';
import Colors from '@/assets/colors.ts';
import CSpacing from '@/assets/styles/spacing.ts';
import { ICON_SIZE } from '@/assets/styles/images.ts';
import * as SolidIcons from 'react-native-heroicons/solid';
import Typography from '@/assets/styles/typography.ts';
import Common from '@/assets/styles/common.ts';
import CRadius from '@/assets/styles/radius.ts';

export interface ICInputProps extends ViewProps, Omit<TextInputProps, 'style'> {
  placeholder?: string;
}

const CInput = (props: ICInputProps) => {
  const {
    placeholder = Localization.t('SEARCH.INPUT_PLACEHOLDER'),
    style,
    onChangeText,
  } = props;

  const [value, setValue] = useState('');
  const [isFocused, setFocused] = useState(false);

  const containerStyle = StyleSheet.flatten([
    styles.wrapper,
    {
      borderColor: isFocused
        ? Colors.primaryControlColor
        : Colors.input_border_color,
    },
    style,
  ]);

  const isShowClearIcon = isFocused && value;

  const onChange = useCallback(
    (text: string) => {
      setValue(text);
      if (onChangeText) {
        onChangeText(text);
      }
    },
    [onChangeText],
  );

  const onPressClear = useCallback(() => {
    setValue('');
    if (onChangeText) {
      onChangeText('');
    }
  }, [onChangeText]);

  return (
    <View style={containerStyle}>
      <TextInput
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        onBlur={() => setFocused(false)}
        onChangeText={onChange}
        value={value}
        placeholderTextColor={'#999999'}
        style={styles.inputStyle}
      />
      {isShowClearIcon && (
        <SolidIcons.XCircleIcon
          size={ICON_SIZE}
          color={Colors.black}
          onPress={onPressClear}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: CRadius.l,
    paddingVertical: CSpacing.m,
    paddingHorizontal: CSpacing.m,
    borderWidth: 1,
    flexDirection: 'row',
    ...Common.shadow,
  },
  inputStyle: {
    flex: 1,
    color: Colors.primaryTextColor,
    ...Typography.body_semibold,
  },
});

export default CInput;
