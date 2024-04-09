import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.TouchableOpacity<{color: string}>`
    padding: 8px;
    border: 1px solid ${props => props.color};
    border-radius: 4px;
    margin-bottom: 4px;
`

export interface IGameListItem {
    id: number;
    onPress?: () => void;
    status: string,
    player1Email:string,
    player2Email:string
}

const GameListItem: React.FC<IGameListItem> = ({id, status, onPress,player1Email,player2Email}) => {
    return (
        <Container color="green" onPress={onPress}>
             <Text>ID: {id}</Text>
            <Text>Status: {status}</Text>
            {(player1Email==="string" || !player1Email) ? (
               <Text style={{color: 'green'}}>Player 1: Free</Text>
            ) : (
                <Text>Player 1: {player1Email}</Text>
            )}
            {(player2Email ==="string" || !player2Email) ? (
                <Text style={{color: 'green'}}>Player 2: Free</Text>
               
            ) : (
                 <Text>Player 2: {player2Email}</Text>
            )}
        </Container>
    )
}

export default GameListItem