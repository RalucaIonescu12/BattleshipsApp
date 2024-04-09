import React, {useState} from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 100px;
    flex-direction: column;
    padding: 50px;
`;

const Input = styled.TextInput`
    width: 100%;
    height: 60px; /* Adjusted height */
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    padding: 8px;
`;

const Button = styled.Text`
    color: #fff;
    background: #000;
    font-size: 20px;
    height:40px;
    width: 200px;
    border-radius: 10px;
    text-align: center;
    margin-left: 40px;
    align-items: center;
    justify-content: center;
`

const ButtonText = styled.Text`
    font-size: 20px;
`;
const ErrorMessage = styled.Text`
  color: red;
  text-align: center;
  margin-bottom:10px;
`;
const SuccessMessage = styled.Text`
    color: green;
    text-align: center;
    margin-bottom: 10px;
`;


export interface ILogin {
    onSubmit: (email: string, password: string) => void
}

const Register: React.FC<ILogin> = ({onSubmit}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
    } else
     {
      onSubmit(email, password);
      setErrorMessage("");
    }
  };

    return (
        <Container>
            <Input   placeholder="Enter email" keyboardType="email-address" onChangeText={setEmail}/>
            <Input   placeholder="Enter password" secureTextEntry onChangeText={setPassword}/>
            <Input placeholder="Confirm password" secureTextEntry onChangeText={setConfirmPassword} />
            {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : <SuccessMessage>Passwords match!</SuccessMessage>}
            <Button onPress={handleSubmit}>
                <Text>Register</Text>
            </Button>
        </Container>
    )
}

export default Register;