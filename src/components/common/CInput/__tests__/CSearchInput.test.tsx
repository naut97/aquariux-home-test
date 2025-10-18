import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CSearchInput, {
  ICSearchInputProps,
} from '@/components/common/CSearchInput';

describe('<CSearchInput />', () => {
  let props: ICSearchInputProps;
  const mockText = 'Test input';

  beforeEach(() => {
    props = {
      placeholder: 'Test placeholder',
      onChangeText: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByPlaceholderText} = render(<CSearchInput {...props} />);
    getByPlaceholderText(props.placeholder);
  });

  it('onChangeText updates the value', () => {
    const {getByPlaceholderText} = render(<CSearchInput {...props} />);
    const input = getByPlaceholderText(props.placeholder);

    fireEvent.changeText(input, mockText);

    expect(input.props.value).toBe(mockText);
  });

  it('call callback when text changed', () => {
    const {getByPlaceholderText} = render(<CSearchInput {...props} />);
    const input = getByPlaceholderText(props.placeholder);

    fireEvent.changeText(input, mockText);

    expect(props.onChangeText).toHaveBeenCalledTimes(1);
    expect(props.onChangeText).toHaveBeenCalledWith(mockText);
  });
});
