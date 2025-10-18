import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CRadius from '@/assets/styles/radius';
import { ICButtonProps } from '@/components/common/CButton/types.ts';
import CText from '@/components/common/CText';
import Colors from '@/assets/colors.ts';
import CSpacing from '@/assets/styles/spacing.ts';

const CButton = ({
  label,
  type = 'primary',
  buttonStyle,
  labelStyle,
  onPress,
  disabled = false,
  iconLocation,
  icon,
  size = 'medium',
}: ICButtonProps) => {
  const LabelComponent = useMemo(() => {
    switch (size) {
      case 'small':
        return CText.BodySemiBold;
      case 'medium':
        return CText.BodySemiBold;
      case 'large':
        return CText.H5;
      default:
        return CText.BodySemiBold;
    }
  }, [size]);

  const typeWrapperStyle = useMemo(() => {
    switch (type) {
      case 'primary':
        return styles.primaryWrapper;
      case 'secondary':
        return styles.secondaryWrapper;
      case 'outline':
        return styles.outlineWrapper;
      case 'text':
        return styles.freeWrapper;
      case 'error-primary':
        return styles.errorPrimaryWrapper;
      case 'error-secondary':
        return styles.errorSecondaryWrapper;
      default:
        return styles.primaryWrapper;
    }
  }, [type]);

  const typeLabelColor = useMemo(() => {
    switch (type) {
      case 'primary':
      case 'error-primary':
        return Colors.white;
      case 'secondary':
        return Colors.secondary_text_color;
      case 'outline':
      case 'text':
        return Colors.neutral_10;
      case 'error-secondary':
        return Colors.error_6;
      default:
        return Colors.white;
    }
  }, [type]);

  const disabledStyle = useMemo(() => {
    return disabled ? { opacity: 0.5 } : {};
  }, [disabled]);

  const buttonFlattenStyle = StyleSheet.flatten([
    [styles.buttonWrapper, typeWrapperStyle, disabledStyle, buttonStyle],
  ]);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={buttonFlattenStyle}
      onPress={onPress}
    >
      <View style={styles.buttonContentWrapper}>
        {iconLocation === 'left' && icon ? (
          <View style={styles.iconWrapperLeft}>{icon}</View>
        ) : null}
        <LabelComponent color={typeLabelColor} style={labelStyle}>
          {label}
        </LabelComponent>
        {iconLocation === 'right' && icon ? (
          <View style={styles.iconWrapperRight}>{icon}</View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const Link = ({
  label,
  labelStyle,
  onPress,
  disabled = false,
  iconLocation,
  icon,
  labelColor = Colors.link_7,
  buttonStyle,
}: ICButtonProps) => {
  const textStyle = StyleSheet.flatten([styles.linkStyle, labelStyle]);
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={buttonStyle}>
      <View style={styles.buttonContentWrapper}>
        {iconLocation === 'left' && icon ? (
          <View style={styles.iconWrapperLeft}>{icon}</View>
        ) : null}
        <CText.BodySemiBold color={labelColor} style={textStyle}>
          {label}
        </CText.BodySemiBold>
        {iconLocation === 'right' && icon ? (
          <View style={styles.iconWrapperRight}>{icon}</View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: CRadius.l,
    alignItems: 'center',
    paddingVertical: CSpacing.l,
    paddingHorizontal: CSpacing.xl,
    justifyContent: 'center',
  },
  primaryWrapper: {
    backgroundColor: Colors.primaryControlColor,
  },
  secondaryWrapper: {
    backgroundColor: Colors.neutral_2,
  },
  outlineWrapper: {
    borderWidth: 1,
  },
  freeWrapper: {
    backgroundColor: Colors.white,
  },
  errorPrimaryWrapper: {
    backgroundColor: Colors.error_6,
  },
  errorSecondaryWrapper: {
    backgroundColor: Colors.white,
  },
  iconWrapperRight: { marginLeft: CSpacing.xs },
  iconWrapperLeft: { marginRight: CSpacing.xs },
  buttonContentWrapper: { flexDirection: 'row', alignItems: 'center' },
  buttonSizeLarge: { height: 44 },
  buttonSizeMedium: { height: 40 },
  buttonSizeSmall: { height: 36 },
  linkStyle: {
    textDecorationLine: 'underline',
  },
});
CButton.Link = (props: ICButtonProps) => <Link {...props} />;
export default CButton;
