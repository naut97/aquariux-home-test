import React from 'react';
import { View } from 'react-native';
import useAppConfiguration from '@/hooks/useAppConfiguration.ts';

interface IInjectedConfigProps {
  onReadyToUse: () => void;
}

const InjectedConfig = ({ onReadyToUse }: IInjectedConfigProps) => {
  useAppConfiguration({
    onReadyToUse,
  });

  return <View />;
};

export default InjectedConfig;
