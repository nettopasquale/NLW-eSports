import React, { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native'
import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../componentes/Heading';
import { GameCardProps, GameCards } from '../../componentes/GameCards';
import { Background } from '../../componentes/Backgroud';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  //handler para abrir a tela de games ao toque
  function handleOpenGame({id, title, bannerUrl}: GameCardProps){
    navigation.navigate('game', {id, title, bannerUrl});
  }

  useEffect(()=>{
    fetch('http://192.168.0.102:3333/games')
      .then(resposta => resposta.json())
      .then(data => setGames(data))
  },[]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
          <Image 
              source={logoImg}
              style={styles.logo}
          />
      <Heading 
        title='Encontre seu duo!' 
        subtitle='Selecione o game que deseja jogar...'
      />

      <FlatList 
        data={games}
        keyExtractor={item => item.id}
        renderItem={({item})=> (
            <GameCards 
            data={item}
            onPress={()=>handleOpenGame(item)}/>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
      </SafeAreaView>
    </Background>
  );
}
      {/* ao invés de passar data na marra como um objeto, importamos GAMES de utils que tem o nosso objeto de games pronto com as 
          mesmas props. */}