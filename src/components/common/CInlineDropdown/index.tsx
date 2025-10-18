import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  View,
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Colors from '@/assets/colors.ts';
import CSpacing from '@/assets/styles/spacing.ts';
import Typography from '@/assets/styles/typography.ts';
import Common from '@/assets/styles/common.ts';
import Icons from '@/assets/icon';
import CRadius from '@/assets/styles/radius.ts';
import CText from '@/components/common/CText';
import dropdownBus from '../CDropdown/dropdownBus';

export interface IData {
  label: string;
  value: string;
}

export interface IInlineDropdownProps {
  data?: IData[];
  onChange?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  value?: string;
}

const CInlineDropdown = (props: IInlineDropdownProps) => {
  const { data = [], style, placeholder = '', onChange } = props;

  const [internalValue, setInternalValue] = useState(props.value || '');
  const [open, setOpen] = useState(false);
  const [triggerHeight, setTriggerHeight] = useState(0);
  const idRef = useRef(Symbol('dropdown'));

  useEffect(() => {
    const unsubscribe = dropdownBus.subscribe(openedId => {
      if (openedId !== idRef.current) {
        setOpen(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const displayText = useMemo(() => {
    if (internalValue) {
      const found = data.find(d => d.value === internalValue);
      return `${found ? found.label : internalValue}`;
    }
    return placeholder;
  }, [data, internalValue, placeholder]);

  const onOpenDropdown = useCallback(() => {
    if (!data?.length) return;
    dropdownBus.emitOpened(idRef.current);
    setOpen(true);
  }, [data]);

  const onSelect = useCallback(
    (item: IData) => {
      setInternalValue(item.value);
      if (onChange) onChange(item.value);
      setOpen(false);
    },
    [onChange],
  );

  const containerStyle = StyleSheet.flatten([styles.wrapper, style]);

  const dropdownIconStyle = StyleSheet.flatten([
    Common.bottomIcon,
    open && { transform: [{ rotate: '90deg' }] },
  ]);

  return (
    <View style={{ width: 120 }}>
      <TouchableOpacity
        style={containerStyle}
        onPress={onOpenDropdown}
        onLayout={e => setTriggerHeight(e.nativeEvent.layout.height)}
      >
        <CText
          typo={'body_semibold'}
          numberOfLines={1}
          color={Colors.primaryControlColor}
        >
          {displayText}
        </CText>
        <Image
          source={Icons.ic_chevron_right}
          style={dropdownIconStyle}
          tintColor={Colors.primaryControlColor}
        />
      </TouchableOpacity>
      {open && (
        <>
          <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
          <View
            style={[styles.modalContent, { top: triggerHeight + 5, zIndex: 3 }]}
          >
            <FlatList
              data={data}
              style={{
                rowGap: CSpacing.s,
                padding: CSpacing.s,
              }}
              keyExtractor={item => item.value}
              renderItem={({ item }) => {
                const isSelected = item.value === internalValue;
                return (
                  <Pressable
                    style={[styles.optionItem]}
                    onPress={() => onSelect(item)}
                  >
                    <CText
                      typo={'body_regular'}
                      color={
                        isSelected
                          ? Colors.primaryControlColor
                          : Colors.primaryTextColor
                      }
                    >
                      {item.label}
                    </CText>
                  </Pressable>
                );
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: CSpacing.s,
    borderBottomWidth: 2,
    borderColor: Colors.primaryControlColor,
  },
  inputStyle: {
    flex: 1,
  },
  backdrop: {
    ...Common.fullScreen,
    ...StyleSheet.absoluteFill,
    zIndex: 2,
  },
  modalContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 200,
    maxHeight: 300,
    width: 200,
    borderBottomLeftRadius: CRadius.l,
    borderBottomRightRadius: CRadius.l,
    overflow: 'visible',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: Colors.input_border_color,
    ...Common.shadow,
  },
  optionItem: {
    paddingHorizontal: CSpacing.l,
    paddingVertical: CSpacing.s,
    borderRadius: CRadius.m,
  },
  optionText: {
    ...Typography.body_regular,
    color: Colors.primaryTextColor,
  },
});

export default CInlineDropdown;
