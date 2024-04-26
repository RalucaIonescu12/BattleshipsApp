import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { GameContext, useGameContext } from '../../hooks/gameContext';
import Table from '../../components/Table';
import {joinGame, sendMove } from '../../api';
import { useAuth } from '../../hooks/authContext';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Button =  styled.Text`
    color: #fff;
    background: #000;
    font-size: 25px;
    height:50px;
    width: 200px;
    margin-top:30px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    margin-left: 90px;
`
const TableScreen = () => {
    const route = useRoute<any>();
    const gameCtx = useGameContext();
    const auth = useAuth();
    const [isUserInGame, setIsUserInGame] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const loadUserEmail = async () => {
        try {
            const userEmailFromStorage = await AsyncStorage.getItem('email');
            setUserEmail(userEmailFromStorage || '');
        } catch (error) {
            console.error('Error fetching user email:', error);
        }
    };
    useEffect(() => {
        loadUserEmail();
        gameCtx.loadGame(route.params.gameId)
    }, [])
    useEffect(() => {
        // check if the user's email matches one of the player's emails in the game
        if (userEmail && ( userEmail === route.params.player1Email || userEmail === route.params.player2Email)) {
            setIsUserInGame(true);
        } else {
            setIsUserInGame(false);
        }
    }, [userEmail, route.params.player1Email, route.params.player2Email]);

    const handleJoinGame = async () => {
        try {
            const data = await joinGame(auth.token, route.params.gameId); 
            console.log("Joined the game:", data);
            setIsUserInGame(true);
        } catch (error) {
            console.error('Error joining game:', error);
        }
    };
    return (
        <SafeAreaView>
            <Text style={{fontSize:18, marginLeft:10}}> Game: {route.params.gameId}</Text>
            {(route.params.player1Email ==="string" || !route.params.player1Email) ? (
                <Text style={{color: 'green',fontSize:18, marginLeft:20}}>Player 1: Free</Text>
               
            ) : (
                 <Text style={{fontSize:18, marginLeft:20}}>Player 2: {route.params.player1Email}</Text>
            )}
            {(route.params.player2Email ==="string" || !route.params.player2Email) ? (
                <Text style={{color: 'green',fontSize:18, marginLeft:20}}>Player 2: Free</Text>
               
            ) : (
                 <Text style={{fontSize:18, marginLeft:20}} >Player 2: {route.params.player2Email}</Text>
            )}
            {isUserInGame ? (
                <Table state={gameCtx.tableState} onClick={(cell) => sendMove(auth.token, route.params.gameId, cell)}/>
            ) : (
                <Button onPress={handleJoinGame}><Text>Join Game</Text></Button>
             
            )}
        </SafeAreaView>
    )
}

export default () => (
    <GameContext>
        <TableScreen/>
    </GameContext>
);