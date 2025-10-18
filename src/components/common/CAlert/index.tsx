import React from 'react';
import CAlert, {THRESH_HOLD} from './CAlert';
import {ICAlertProps} from '@/components/common/CAlert/types.ts';

const alertRef = React.createRef<any>();

const CAlertProvider = () => {
  return <CAlert ref={alertRef} />;
};

CAlertProvider.showAlert = (data: ICAlertProps) => {
  if (alertRef) {
    alertRef?.current?.show?.(data);
  }
};

CAlertProvider.ThreshHold = THRESH_HOLD;

export default CAlertProvider;
