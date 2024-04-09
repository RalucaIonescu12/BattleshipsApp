import React, {useState} from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 60px;
    flex-direction: column;
    padding: 50px;
`

const Input = styled.TextInput`
    width: 100%;
    height: 60px;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    padding: 8px;
    align-items: center;
`

const Button = styled.Text`
    color: #fff;
    background: #000;
    font-size: 20px;
    height:40px;
    width: 200px;
    border-radius: 10px;
    text-align: center;
    margin-left: 40px;
`

const StyledText = styled.Text`
  margin-top: 300px;
  text-align: center;
  color: #333; 
  font-size: 20px; 
`

export interface ILogin {
    onSubmit: (email: string, password: string) => void;
    goToRegister: () => void;
}

const Login: React.FC<ILogin> = ({onSubmit, goToRegister}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => onSubmit(email, password)

    return (
        <Container>
            <Input  placeholder="Enter email" keyboardType="email-address" onChangeText={setEmail}/>
            <Input placeholder="Enter password" secureTextEntry onChangeText={setPassword}/>
            <Button onPress={handleSubmit}>
                <Text>Submit</Text>
            </Button>
            <StyledText>You don't have an account?</StyledText>
            <Button onPress={goToRegister}>
                <Text>Register</Text>
            </Button>
        </Container>
    )
}

export default Login;