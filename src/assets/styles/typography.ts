import FontSize from '@/assets/styles/fontsize.ts';

export type TypographyType = keyof typeof Typography;

export const getFontFamilyFromProps = (
  typo: TypographyType = 'body_regular',
) => {
  return Typography[typo] || Typography.body_regular;
};

const Typography = {
  h1: {
    fontSize: FontSize.h1,
    fontFamily: 'GoogleSans-Medium',
  },
  h2: {
    fontSize: FontSize.h2,
    fontFamily: 'GoogleSans-Medium',
  },
  h3: {
    fontSize: FontSize.h3,
    fontFamily: 'GoogleSans-Medium',
  },
  h4: {
    fontSize: FontSize.h4,
    fontFamily: 'GoogleSans-Medium',
  },
  h4_regular: {
    fontSize: FontSize.h4,
    fontFamily: 'GoogleSans-Regular',
  },
  h4_light_italic: {
    fontSize: FontSize.h4,
    fontStyle: 'italic',
    fontFamily: 'GoogleSans-LightItalic',
  },
  h5: {
    fontSize: FontSize.h5,
    fontFamily: 'GoogleSans-Medium',
  },
  h5_regular: {
    fontSize: FontSize.h5,
    fontFamily: 'GoogleSans-Regular',
  },
  body_regular: {
    fontSize: FontSize.body,
    fontFamily: 'GoogleSans-Regular',
  },
  body_medium: {
    fontSize: FontSize.body,
    fontFamily: 'GoogleSans-Medium',
  },
  body_semibold: {
    fontSize: FontSize.body,
    fontFamily: 'GoogleSans-Medium',
  },
  support_regular: {
    fontSize: FontSize.support_regular,
    fontFamily: 'GoogleSans-Regular',
  },
  support_medium: {
    fontSize: FontSize.support_regular,
    fontFamily: 'GoogleSans-Medium',
  },
  support_small_regular: {
    fontSize: FontSize.support_small,
    fontFamily: 'GoogleSans-Regular',
  },
  support_small_medium: {
    fontSize: FontSize.support_small,
    fontFamily: 'GoogleSans-Medium',
  },
};

export default Typography;
