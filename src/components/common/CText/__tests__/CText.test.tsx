import React from 'react';
import {render, cleanup} from '@testing-library/react-native';

import CText from '@/components/common/CText';

afterEach(cleanup);

describe('CText', () => {
  it('renders correctly with default props', () => {
    const {getByText} = render(<CText>Test text</CText>);

    expect(getByText('Test text')).toBeTruthy();
  });

  it('renders correctly with H1 variant', () => {
    const {getByText} = render(<CText.H1>Test text H1</CText.H1>);

    expect(getByText('Test text H1')).toBeTruthy();
  });

  it('renders correctly with H2 variant', () => {
    const {getByText} = render(<CText.H2>Test text H2</CText.H2>);

    expect(getByText('Test text H2')).toBeTruthy();
  });
});
