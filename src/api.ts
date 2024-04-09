import { CellId, XCoordinate, YCoordinate } from "./hooks/gameContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
// const baseUrl = process.env.EXPO_PUBLIC_API_URL;
const baseUrl="https://malamute-enabled-yak.ngrok-free.app"
console.log(baseUrl)
const baseHeaders = {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
}

export const login = async (email: string, password: string): Promise<string> => {
    const result = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })
    const data = await result.json()
    console.log("access token: " + data.accessToken)

    return data.accessToken
};

export const register = async (email: string, password: string) => {
    const result = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()
    return data.id
};

export const fetchUserDetails = async (): Promise<any> => {
    // Get token from AsyncStorage
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
  
    try {
      const response = await fetch(`${baseUrl}/user/details/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch user details');
      }
    } catch (error:any) {
      throw new Error('Error fetching user details: ' + error.message);
    }
  };
export const listGames = async (token: string) => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'get',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json();
    return data
}

export const createGame = async (token: string) => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })
   
    const data = await result.json();
    console.log("CREATED THE GAME: "+ data.id+ " "+ data.status)
    return data
}

export const loadGame = async (token: string, gameId: number) => {
    const result = await fetch(`${baseUrl}/game/${gameId}`, {
        method: 'get',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json();

    return data
}

export const sendMove = async (token: string, gameId: number, cell: CellId) => {
    
    const x: XCoordinate = cell.charAt(0) as XCoordinate;
    const y: YCoordinate = parseInt(cell.slice(1), 10) as YCoordinate;

    const requestBody = {
        x,
        y,
    };

    const result = await fetch(`${baseUrl}/game/move/${gameId}`, {
        method: 'post',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
    })

    const data = await result.json();

    return data
}