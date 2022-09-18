import React from 'react';
import { View, Text, ColorValue } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

interface Props{
  label: string;
  value: string;
  colorValue?: ColorValue;
}
// colorValue = THEME.COLORS.TEXT é caso n seja passado um valor para colorValue, já q é opcional
export function DuoInfo({label, value, colorValue = THEME.COLORS.TEXT}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={[styles.value, {color: colorValue}]}
      numberOfLines={1}>
        {value}
      </Text>

    </View>
  );
}