import { NavigationProp, useNavigation } from "@react-navigation/native"
import Login from "../../components/Login"
import { AuthRouteNames } from "../../router/route-names"
import { useAuth } from "../../hooks/authContext"

const LoginScreen = () => {
    const navigation = useNavigation<any>()
    const handleGoToRegister = () => {
        // console.log('Navigating to REGISTER screen with params:', AuthRouteNames.REGISTER);
        navigation.navigate(AuthRouteNames.REGISTER)
    }
    const auth = useAuth()
    const handleLogin = async (email: string, password: string) => {
        try {
            await auth.login(email, password);
            navigation.navigate(AuthRouteNames.DETAILS);
        } catch (error) {
            console.error('Login error:', error);
        }
    };


    return <Login onSubmit={handleLogin} goToRegister={handleGoToRegister}/> 
}

export default LoginScreen