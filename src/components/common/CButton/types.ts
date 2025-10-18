import {TextStyle, ViewStyle} from 'react-native';
import React from 'react';

type ButtonType =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'text'
  | 'error-primary'
  | 'error-secondary';

/**
 * Interface for Button properties
 * @interface
 */
export interface ICButtonProps {
  /**
   * The label to be displayed on the button
   * @type {string}
   */
  label: string;

  /**
   * The type of the button, can be 'primary', 'secondary', 'outline', 'text', or 'error'
   * @type {ButtonType}
   */
  type?: ButtonType;

  /**
   * The style to be applied to the button
   * @type {ViewStyle}
   */
  buttonStyle?: ViewStyle;

  /**
   * The style to be applied to the label of the button
   * @type {TextStyle}
   */
  labelStyle?: TextStyle;

  /**
   * The function to be executed when the button is pressed
   * @type {() => void}
   */
  onPress?: () => void;

  /**
   * If true, the button will be disabled
   * @type {boolean}
   */
  disabled?: boolean;

  /**
   * The icon to be displayed on the button
   * @type {React.ReactNode}
   */
  icon?: React.ReactNode;

  /**
   * The location of the icon on the button, can be 'left' or 'right'
   * @type {'left' | 'right'}
   */
  iconLocation?: 'left' | 'right';

  /**
   * The size of the button, can be 'small', 'medium', or 'large'
   * @type {'small' | 'medium' | 'large'}
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * The color of the label
   * @type {string}
   */
  labelColor?: string;
}
