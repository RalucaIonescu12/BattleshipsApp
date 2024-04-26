import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../hooks/authContext"
import { TouchableOpacity, Text, Button, View,  StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { listGames, createGame, } from "../../api"
import GameListItem from "../../components/GameListItem"
import styled from "styled-components/native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthRouteNames, GameRouteNames } from "../../router/route-names"
import AsyncStorage from "@react-native-async-storage/async-storage"
const Container = styled(SafeAreaView)`
    display: flex;
    flex: 1;
    padding: 0 8px;
`;
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
});
const GameList = styled.ScrollView``

const LobbyScreen = () => {
    const navigation = useNavigation<any>()
    const auth = useAuth();
    const [games, setGames] = useState<any[]>([]);
    const [filterApplied, setFilterApplied] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    
    useEffect(() => {
        loadUserEmail();
        loadGames();
      }, [auth.token]);

      const loadUserEmail = async () => {
        try {
            const userEmailFromStorage = await AsyncStorage.getItem('email');
            setUserEmail(userEmailFromStorage || '');
            console.log("Email in async storage: "+userEmail)
        } catch (error) {
            console.error('Error fetching user email:', error);
        }
    };
    const loadGames = async () => {
        try {
        const data = await listGames(auth.token);
        if (Array.isArray(data.games)) {
            setGames(data.games);
        } else {
            console.error('Games data is not an array:', data);
        }
        } catch (error) {
        console.error('Error fetching games:', error);
        }
    };
    const applyFilter = () => {
        setFilterApplied(true);
        loadUserEmail();
        loadGames(); 
      };
    
      const clearFilter = () => {
        setFilterApplied(false);
        loadUserEmail();
        loadGames(); 
      };

    const handleAddGame = async () => {
        await createGame(auth.token);
        loadGames();
        // listGames(auth.token).
        // then(data => {
        //     // console.log("Games data:", data); 
        //     if (Array.isArray(data.games)) {
        //         setGames(data.games);
        //         console.log("SET GAMES")
        //     } else {
        //         console.error('Games data is not an array:', data);
        //     }}).
        // catch(error => console.error('Error fetching games:', error));
    }

    const goToUserDetails = () => {
        navigation.navigate(AuthRouteNames.DETAILS)
    }
    return (
        <Container>
        <View style={styles.buttonContainer}>
            <Button title="Profile" onPress={goToUserDetails} color="black"/>
        </View>
        <View style={styles.buttonContainer} >
            <Button title= "CREATE GAME" onPress={handleAddGame}  color="black" />
        </View>
        <View style={{ marginTop: 10 }}>
        <Button title="Filter My Games" onPress={applyFilter}color="black" />
        </View>
        <View style={styles.buttonContainer}>
        <Button title="Clear Filter" onPress={clearFilter}color="black" />
        </View>
      <GameList style={{marginTop:20}}>
  {filterApplied
    ? games
        .filter((game) => (game.player1 && game.player1.email === auth.email) || (game.player2 && game.player2.email === auth.email) )
        .map((game) => (
          <GameListItem
            status={game.status}
            player1Email={game.player1?.email}
            player2Email={game.player2 ? game.player2.email : "string"}
            id={game.id}
            key={game.id}
            onPress={() => {
              navigation.navigate(GameRouteNames.TABLE,  { gameId: game.id, 
              player1Email: game.player1 ? game.player1.email : "string", 
              player2Email: game.player2 ? game.player2.email : "string" });
            }}
          />
        ))
    : games
    .filter((game) => !game.player1 || !game.player2)
    .map((game) => (
        <GameListItem
          status={game.status}
          player1Email={game.player1?.email}
          player2Email={game.player2 ? game.player2.email : null}
          id={game.id}
          key={game.id}
          onPress={() => {
            navigation.navigate(GameRouteNames.TABLE, { gameId: game.id, 
            player1Email: game.player1 ? game.player1.email : "string", 
            player2Email: game.player2 ? game.player2.email : "string" });
          }}
        />
      ))}
</GameList>
        </Container>
    )
}

export default LobbyScreen