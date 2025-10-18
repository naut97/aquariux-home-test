import React from 'react';
import {Text, StyleSheet, TextProps} from 'react-native';
import Colors from '@/assets/colors.ts';
import {destructureLayoutProps} from '@/assets/styles/spacing.ts';
import {
  getFontFamilyFromProps,
  TypographyType,
} from '@/assets/styles/typography.ts';
import {BaseLayoutProps} from '@/types/layout.ts';

interface CTextProps extends TextProps, BaseLayoutProps {
  color?: string;
  typo?: TypographyType;
}

const CText = (props: CTextProps) => {
  const {
    children = '',
    color = Colors.primaryTextColor,
    typo = 'body_regular',
    style,
    ...rest
  } = props;

  const baseStyle = StyleSheet.flatten([{color: color}]);
  const fontStyle = getFontFamilyFromProps(typo);
  const layoutStyle = destructureLayoutProps(props);
  const combinedStyle = StyleSheet.flatten([
    baseStyle,
    layoutStyle,
    fontStyle,
    style,
  ]);

  return (
    <Text {...rest} allowFontScaling={false} style={combinedStyle}>
      {children}
    </Text>
  );
};

CText.Base = (props: CTextProps) => <CText {...props} />;
CText.H1 = (props: CTextProps) => <CText typo={'h1'} {...props} />;
CText.H2 = (props: CTextProps) => <CText typo={'h2'} {...props} />;
CText.H3 = (props: CTextProps) => <CText typo={'h3'} {...props} />;
CText.H4 = (props: CTextProps) => <CText typo={'h4'} {...props} />;
CText.H5 = (props: CTextProps) => <CText typo={'h5'} {...props} />;
CText.BodyRegular = (props: CTextProps) => (
  <CText typo={'body_regular'} {...props} />
);
CText.BodyMedium = (props: CTextProps) => (
  <CText typo={'body_medium'} {...props} />
);
CText.BodySemiBold = (props: CTextProps) => (
  <CText typo={'body_semibold'} {...props} />
);
CText.SupportRegular = (props: CTextProps) => (
  <CText typo={'support_regular'} {...props} />
);
CText.SupportMedium = (props: CTextProps) => (
  <CText typo={'support_medium'} {...props} />
);
CText.SupportSmRegular = (props: CTextProps) => (
  <CText typo={'support_small_regular'} {...props} />
);
CText.SupportSmMedium = (props: CTextProps) => (
  <CText typo={'support_small_medium'} {...props} />
);

export default CText;
