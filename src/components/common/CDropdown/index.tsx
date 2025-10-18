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
import dropdownBus from './dropdownBus';

export interface IData {
  label: string;
  value: string;
}

export interface IDropdownProps {
  data?: IData[];
  onChange?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  value?: string;
}

const CDropdown = (props: IDropdownProps) => {
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

  const containerStyle = StyleSheet.flatten([
    styles.wrapper,
    style,
    !open && { borderRadius: CRadius.l },
  ]);

  const dropdownIconStyle = StyleSheet.flatten([
    Common.bottomIcon,
    open && { transform: [{ rotate: '90deg' }] },
  ]);

  return (
    <View>
      <TouchableOpacity
        style={containerStyle}
        onPress={onOpenDropdown}
        onLayout={e => setTriggerHeight(e.nativeEvent.layout.height)}
      >
        <CText
          typo={'body_semibold'}
          numberOfLines={1}
          color={Colors.primaryTextColor}
          style={Common.flex}
        >
          {displayText}
        </CText>
        <Image source={Icons.ic_chevron_right} style={dropdownIconStyle} />
      </TouchableOpacity>
      {open && (
        <>
          <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
          <View
            style={[styles.modalContent, { top: triggerHeight, zIndex: 3 }]}
          >
            <FlatList
              data={data}
              contentContainerStyle={{
                rowGap: CSpacing.s,
              }}
              style={{
                padding: CSpacing.l,
              }}
              keyExtractor={item => item.value}
              renderItem={({ item }) => {
                const isSelected = item.value === internalValue;
                return (
                  <Pressable
                    style={[
                      styles.optionItem,
                      isSelected && {
                        backgroundColor: Colors.primaryControlColor,
                      },
                    ]}
                    onPress={() => onSelect(item)}
                  >
                    <CText
                      typo={'body_regular'}
                      color={
                        isSelected ? Colors.white : Colors.primaryTextColor
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
    borderTopLeftRadius: CRadius.l,
    borderTopRightRadius: CRadius.l,
    paddingVertical: CSpacing.m,
    paddingHorizontal: CSpacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: CSpacing.s,
    borderWidth: 1,
    borderColor: Colors.input_border_color,
    ...Common.shadow,
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
    backgroundColor: Colors.gray,
    borderRadius: CRadius.m,
  },
  optionText: {
    ...Typography.body_regular,
    color: Colors.primaryTextColor,
  },
});

export default CDropdown;
