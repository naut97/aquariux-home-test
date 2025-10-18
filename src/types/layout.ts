import {SpacingType} from '@/assets/styles/spacing.ts';

export interface BaseLayoutProps {
  /**
   * Shortcut for `padding` style
   */
  padding?: SpacingType;

  /**
   * Shortcut for `paddingHorizontal` style
   */
  paddingH?: SpacingType;

  /**
   * Shortcut for `paddingVertical` style
   */
  paddingV?: SpacingType;

  /**
   * Shortcut for `paddingTop` style
   */
  paddingT?: SpacingType;

  /**
   * Shortcut for `paddingBottom` style
   */
  paddingB?: SpacingType;

  /**
   * Shortcut for `paddingLeft` style
   */
  paddingL?: SpacingType;

  /**
   * Shortcut for `paddingRight` style
   */
  paddingR?: SpacingType;

  /**
   * Shortcut for `margin` style
   */
  margin?: SpacingType;

  /**
   * Shortcut for `marginHorizontal` style
   */
  marginH?: SpacingType;

  /**
   * Shortcut for `marginVertical` style
   */
  marginV?: SpacingType;

  /**
   * Shortcut for `marginTop` style
   */
  marginT?: SpacingType;

  /**
   * Shortcut for `marginBottom` style
   */
  marginB?: SpacingType;

  /**
   * Shortcut for `marginLeft` style
   */
  marginL?: SpacingType;

  /**
   * Shortcut for `marginRight` style
   */
  marginR?: SpacingType;
}
