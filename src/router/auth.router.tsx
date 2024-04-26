import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/Login.screen';
import RegisterScreen from '../screens/auth/Register.screen';
import { AuthRouteNames, GameRouteNames } from './route-names';
import { Text } from 'react-native';
import UserDetailsScreen from '../screens/UserDetails.screen';
import LobbyScreen from '../screens/game/Lobby.screen';
import TableScreen from '../screens/game/Table.screen';

const AuthStack = createNativeStackNavigator()

const authRoutes = (
    <AuthStack.Navigator initialRouteName='Login'>
        <AuthStack.Screen name={AuthRouteNames.LOGIN} component={LoginScreen} options={{
            headerTitle: (props) => <Text {...props}>Login</Text>
        }}/>
        <AuthStack.Screen name={AuthRouteNames.REGISTER} component={RegisterScreen} options={{
            headerTitle: (props) => <Text {...props}>Register</Text>
        }}/>
        <AuthStack.Screen name={AuthRouteNames.DETAILS} component={UserDetailsScreen} options={{
            headerTitle: (props) => <Text {...props}>My details</Text>
        }}/>
        <AuthStack.Screen name={GameRouteNames.LOBBY} component={LobbyScreen} options={{
            headerTitle: (props) => <Text {...props}>Lobby</Text>
        }}/>
        <AuthStack.Screen name={GameRouteNames.TABLE} component={TableScreen} options={{
            headerTitle: (props) => <Text {...props}>Game</Text>
        }}/>
    </AuthStack.Navigator>
)

export default authRoutes;