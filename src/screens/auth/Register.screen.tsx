import Register from "../../components/Register"
import { useAuth } from "../../hooks/authContext"
import { useNavigation } from "@react-navigation/native"; 
import { AuthRouteNames } from "../../router/route-names";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
    const auth = useAuth()
    const navigation = useNavigation<any>()

    const handleRegister = async (email: string, password: string) => {
        try {
            await auth.register(email, password);
            
            navigation.navigate(AuthRouteNames.LOGIN);
        } catch (error) {
            console.error('Register error:', error);
        }
    };
    
    return <Register onSubmit={handleRegister} />
}

export default RegisterScreen