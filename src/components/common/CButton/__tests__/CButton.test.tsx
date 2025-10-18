import React from 'react';
import {Text} from 'react-native';
import {render, fireEvent, cleanup} from '@testing-library/react-native';

import CButton from '@/components/common/CButton';

afterEach(cleanup);

describe('CButton', () => {
  it('renders correctly with default props', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <CButton onPress={onPressMock} label={'Test Button'} />,
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <CButton onPress={onPressMock} label={'Test Button'} />,
    );

    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('doesnt call onPress when pressed and disabled', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <CButton onPress={onPressMock} disabled label={'Test Button'} />,
    );

    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("renders correctly with 'primary' type", () => {
    const {getByText} = render(
      <CButton type="primary" label={'Primary Button'} />,
    );

    expect(getByText('Primary Button')).toBeTruthy();
  });

  it("renders correctly with iconLocation as 'left'", () => {
    // Mock icon to test
    const {getByText} = render(
      <CButton
        iconLocation="left"
        icon={<Text>Icon</Text>}
        label={'Icon Left Button'}></CButton>,
    );

    expect(getByText('Icon Left Button')).toBeTruthy();
    expect(getByText('Icon')).toBeTruthy();
  });
});
