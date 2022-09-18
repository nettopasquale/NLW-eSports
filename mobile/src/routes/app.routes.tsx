import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '../telas/Home';
import {Game} from '../telas/Game';

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen 
                name='home'
                component={Home}
            
            />
            <Screen
                name='game'
                component={Game}
            />
        </Navigator>
    )
}