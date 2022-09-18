import React from 'react';
import { View, Text, ViewProps } from 'react-native';

import { styles } from './styles';

//Lemrbando q extende do próprio componente nativo View
interface Props extends ViewProps{
    title: string;
    subtitle: string;
}

// ...rest ajuda a gente não passar mais um monte de coisa caso haja necessidade depois!
export function Heading({title, subtitle, ...rest}: Props) {
  return (
    <View style={styles.container} {...rest}>
        <Text style={styles.title}>
            {title}
        </Text>

        <Text style={styles.subtitle}>
            {subtitle}
        </Text>
    </View>
  );
}