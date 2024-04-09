import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet, Button  } from 'react-native';
import { useAuth } from '../hooks/authContext';
import { fetchUserDetails } from '../api'; // Import the fetchUserDetails function
import { AuthRouteNames, GameRouteNames } from '../router/route-names';
import { NavigationProp, useNavigation } from "@react-navigation/native"
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    card: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    category: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    detail: {
      fontSize: 16,
      marginBottom: 10,
    },
    bold: {
      fontWeight: 'bold',
    },
    loading: {
      fontSize: 16,
      fontStyle: 'italic',
    },
  });

const UserDetailsScreen = () => {
  const auth = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);
  const navigation = useNavigation<any>()

  const logout = () => {
    navigation.navigate(AuthRouteNames.LOGIN);
  };
  const goToGameLobby = () => {
    navigation.navigate(GameRouteNames.LOBBY);
  };
  useEffect(() => {
    const fetchUserDetailsData = async () => {
      try {
        const data = await fetchUserDetails();
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetailsData();
  }, [auth.token]); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      <View style={styles.card}>
        {userDetails ? (
          <>
            <Text style={styles.category}>ID:</Text>
            <Text style={styles.detail}>{userDetails.user.id}</Text>

            <Text style={styles.category}>Email:</Text>
            <Text style={[styles.detail]}>{userDetails.user.email}</Text>

            <Text style={styles.category}>Games Played:</Text>
            <Text style={styles.detail}>{userDetails.gamesPlayed}</Text>

            <Text style={styles.category}>Games Lost:</Text>
            <Text style={styles.detail}>{userDetails.gamesLost}</Text>

            <Text style={styles.category}>Games Won:</Text>
            <Text style={styles.detail}>{userDetails.gamesWon}</Text>

            <Text style={styles.category}>Currently Playing:</Text>
            <Text style={styles.detail}>{userDetails.currentlyGamesPlaying}</Text>
          </>
        ) : (
          <Text style={styles.loading}>Loading...</Text>
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Go to game lobby" onPress={goToGameLobby} color="black"  />
      </View>

      <View style={{ marginTop: 130 }}>
        <Button title="LOGOUT" onPress={logout} color="black" />
      </View>
    </View>

  );
};

export default UserDetailsScreen;