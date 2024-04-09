import { createContext, useContext, useEffect, useRef, useState } from 'react';
import {loadGame} from '../api';
import { useAuth } from './authContext';

export type CellId = 'A1' | 'A2' | 'A3' | 'B1' | 'B2' | 'B3' | 'C1' | 'C2' | 'C3';
export type CellValue = 'x' | '0' | '';

export interface ICell {
    value: CellValue;
    id: CellId
}


interface User {
    createdAt: string;
    user: any;
    game?: string;
    userId: number;
    gameId: number
}

interface Move {
    createdAt: string;
    userId: number;
    cell: CellId;
    gameId: number

}

enum GameStatus {
    OPEN = "open",
    ACTIVE = "active",
    DRAW = "ended_draw",
    WIN = "ended_win"
}

interface Game {
    createdAt: string;
    id: number;
    users: User[];
    winnerId: number;
    moves: Move[];
    playerToMove: number;
    status: GameStatus
}

interface GameContext {
    game: Game | null;
    loadGame: (id: number) => Promise<void>;
    tableState: ICell[][];
}

const Context = createContext<GameContext>({
    loadGame: () => Promise.resolve(),
    game: null,
    tableState: []
});

const baseTableState: ICell[][] = [
    [{id: 'A1', value: ''}, {id: 'A2', value: ''}, {id: 'A3', value: ''}],
    [{id: 'B1', value: ''}, {id: 'B2', value: ''}, {id: 'B3', value: ''}],
    [{id: 'C1', value: ''}, {id: 'C2', value: ''}, {id: 'C3', value: ''}]
]

export const GameContext: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [game, setGame] = useState<Game | null>(null);
    const [tableState, setTableState] = useState<ICell[][]>([]);
    const auth = useAuth();
    const loopRef = useRef<NodeJS.Timeout>();

    const gameToTabelState = () => {
        if (!game) return baseTableState;
        const movesMap: Partial<{[key in CellId]: CellValue}> = {};
        game.moves.forEach(move => {
            let value: CellValue = '';
            if (move.userId === game.users[0].userId) {
                value = 'x';
            } else {
                value = '0';
            }
            movesMap[move.cell] = value;
        });
        return baseTableState.map(
            row => row.map(({id, value}) => ({id, value: movesMap[id] || value}))
        )
    }

    const handleLoadGame = async (id: number) => {
        const result = await loadGame(auth.token, id);
        setGame(result);
    }

    useEffect(() => {
        setTableState(gameToTabelState());
    }, [game]);

    useEffect(() => {
        loopRef.current = setInterval(() => {
            if (game) {
                handleLoadGame(game.id)
            }
        }, 1000);
        return () => {
            clearInterval(loopRef.current)
        }
    }, [game])

    return (<Context.Provider value={{loadGame: handleLoadGame, game, tableState}}>
        {children}
    </Context.Provider>)
};

export const useGameContext = () => useContext(Context);
