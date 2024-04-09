import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GameRouteNames } from './route-names';
import { Text } from 'react-native'
import LobbyScreen from '../screens/game/Lobby.screen';
import TabelScreen from '../screens/game/Table.screen';

const GameStack = createNativeStackNavigator()

const gameRoutes = (
    <GameStack.Navigator>
        <GameStack.Screen name={GameRouteNames.LOBBY} component={LobbyScreen} options={{
            header: () => null,
        }}/>
        <GameStack.Screen name={GameRouteNames.TABLE} component={TabelScreen} options={{
            headerTitle: (props) => <Text {...props}>Game</Text>
        }}/>
    </GameStack.Navigator>
)

export default gameRoutes;