import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ICAlertProps} from '@/components/common/CAlert/types.ts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CSpacing from '@/assets/styles/spacing.ts';
import Colors from '@/assets/colors.ts';
import get from 'lodash/get';
import * as SolidIcon from 'react-native-heroicons/solid';
import {ICON_SIZE} from '@/assets/styles/images.ts';
import CText from '@/components/common/CText';
import CButton from '@/components/common/CButton';

export const THRESH_HOLD = {
  LONG: 5000,
  SHORT: 2000,
};

const {width} = Dimensions.get('window');

const defaultPassProps: ICAlertProps = {
  type: 'success',
  closable: true,
  autoHideThreshold: THRESH_HOLD.SHORT,
  autoHide: false,
  title: '',
  content: '',
  actionLabel: '',
};

const CAlert = (_: any, ref: any) => {
  const insets = useSafeAreaInsets();
  const [isShow, setShow] = useState(false);
  const [passProps, setPassProps] = useState<ICAlertProps>(defaultPassProps);
  const successContainer = useMemo(() => {
    switch (passProps.type) {
      case 'success': {
        return styles.successContainer;
      }

      case 'warning': {
        return styles.warningContainer;
      }

      case 'error': {
        return styles.errorContainer;
      }

      default:
        return styles.successContainer;
    }
  }, [passProps]);

  const titleAlert = useMemo(() => {
    return get(passProps, 'title', '');
  }, [passProps]);

  const colorTitle = useMemo(() => {
    switch (passProps.type) {
      case 'success': {
        return Colors.success_6;
      }

      case 'warning': {
        return Colors.warning_6;
      }

      case 'error': {
        return Colors.error_6;
      }

      default:
        return Colors.success_6;
    }
  }, [passProps]);

  const IconComponent = useMemo(() => {
    switch (passProps.type) {
      case 'success': {
        return SolidIcon.CheckCircleIcon;
      }

      case 'warning': {
        return SolidIcon.ExclamationTriangleIcon;
      }

      case 'error': {
        return SolidIcon.XCircleIcon;
      }

      default:
        return SolidIcon.CheckCircleIcon;
    }
  }, [passProps]);

  const contentAlert = useMemo(() => {
    return get(passProps, 'content', '');
  }, [passProps]);

  const actionText = useMemo(() => {
    return get(passProps, 'actionLabel', '');
  }, [passProps]);

  const isLocationOnTop = useMemo(() => {
    const location = get(passProps, 'location', 'bottom');
    if (location !== 'top' && location !== 'bottom') {
      // default bottom
      return false;
    }
    return location === 'top';
  }, [passProps]);

  const offsetLocationStyle = useMemo(() => {
    return isLocationOnTop
      ? {top: insets.top + CSpacing.s}
      : {bottom: insets.bottom + CSpacing.l};
  }, [isLocationOnTop, insets]);

  useEffect(() => {
    let timeout: any;
    if (isShow) {
      const isAutoHide = get(passProps, 'autoHide', true);
      if (isAutoHide) {
        const threshHold = get(
          passProps,
          'autoHideThreshold',
          THRESH_HOLD.SHORT,
        );
        timeout = setTimeout(() => {
          onHideAlert();
        }, threshHold);
      }
    }
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [isShow, passProps]);

  const isShowCloseButton = useMemo(() => {
    return get(passProps, 'closable', false);
  }, [passProps]);

  const onShowAlert = (data: ICAlertProps) => {
    setPassProps(data);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShow(true);
  };

  const onHideAlert = () => {
    setPassProps(defaultPassProps);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShow(false);
  };

  const onPressAction = useCallback(() => {
    if (passProps?.onPressAction) {
      passProps.onPressAction();
    }

    onHideAlert();
  }, [passProps]);

  useImperativeHandle(ref, () => ({
    show: onShowAlert,
    hide: onHideAlert,
  }));

  return isShow ? (
    <View style={[styles.container, successContainer, offsetLocationStyle]}>
      <View style={styles.headerRow}>
        <IconComponent color={colorTitle} size={ICON_SIZE} />
        <View style={styles.textContent}>
          <CText.H5 color={colorTitle} numberOfLines={1}>
            {titleAlert}
          </CText.H5>
        </View>
        {isShowCloseButton && (
          <TouchableOpacity onPress={onHideAlert}>
            <SolidIcon.XMarkIcon color={colorTitle} size={ICON_SIZE} />
          </TouchableOpacity>
        )}
      </View>
      {!!contentAlert && (
        <View style={styles.contentRow}>
          <View style={styles.fakeView} />
          <View style={styles.textContent}>
            <CText.BodyRegular color={Colors.neutral_10}>
              {contentAlert}
            </CText.BodyRegular>
          </View>
          <View style={styles.fakeView} />
        </View>
      )}
      {!!actionText && (
        <View style={styles.contentRow}>
          <View style={styles.fakeView} />
          <View style={styles.textContent}>
            <CButton.Link
              label={actionText}
              labelColor={colorTitle}
              onPress={onPressAction}
            />
          </View>
          <View style={{width: 24}} />
        </View>
      )}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  fakeView: {
    width: 24,
  },
  container: {
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: CSpacing.xs,
    width: width - 2 * CSpacing.xs,
    padding: CSpacing.s,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: CSpacing.xs,
  },
  textContent: {
    paddingLeft: CSpacing.xs,
    flex: 1,
  },
  successContainer: {
    backgroundColor: Colors.success_1,
  },
  warningContainer: {
    backgroundColor: Colors.warning_1,
  },
  errorContainer: {
    backgroundColor: Colors.error_1,
  },
});

export default forwardRef(CAlert);
