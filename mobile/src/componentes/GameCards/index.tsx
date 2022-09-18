import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, ImageBackground, Text, TouchableOpacityProps } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

// exportaremos pq será reutilizada depois. ImageSourcePropType é uma prop nativa do react native para origem de imagem;
export interface GameCardProps{
    id: string;
    title: string;
    _count: {
        ads: number;
    };
    bannerUrl: string
}

// essa interface recebe data cuja propriedade é a interface GameCardProps!
interface Props extends TouchableOpacityProps{
    data: GameCardProps;
}

export function GameCards({data, ...rest}: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
        <ImageBackground 
            style={styles.cover}
            source={{uri: data.bannerUrl}} 
        >
            <LinearGradient 
                colors={THEME.COLORS.FOOTER}
                style={styles.footer}
            >
                <Text style={styles.name}>
                    {data.title}
                </Text>

                <Text style={styles.ads}>
                    {data._count.ads} anúncios
                </Text>
            </LinearGradient>
        </ImageBackground>
    </TouchableOpacity>
  );
}