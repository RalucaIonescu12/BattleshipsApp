import React from "react";
import styled from "styled-components/native";
import { Text, View } from "react-native";
import { CellId, ICell, XCoordinate, YCoordinate } from "../hooks/gameContext";

// export type XCoordinate = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
// export type YCoordinate = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
 
interface ITable {
    state: ICell[][];
    onClick: (cellId: CellId) => Promise<any>;
    
}

function getXCoordinate(index: number): XCoordinate {
    return String.fromCharCode(65 + index) as XCoordinate;
}
function getYCoordinate(index: number): YCoordinate {
    return  index as YCoordinate;
}

function setSpaces(spaces: number)
{

}
const Cell = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    border: 1px solid;
    margin: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Row = styled.View`
    disiplay: flex;
    flex-direction: row;
    margin-left:20px;
`

const Table: React.FC<ITable> = ({state, onClick}) => {
    const clickedSquare = async (id: any) =>{
        console.log("Clicked on square: "+ id); 
    } ;
    
    return (
    state.map((line, index) => (
            <>
            <Row key={index}>
                <Text style={{width:20}}>{index+1}</Text>
                {
                    line.map(({ id, value }) => (
                    <>
                    <Cell key={id} onPress={() => onClick(id)}>
                        <Text>{value}</Text>
                    </Cell>
                    </>
                ))}
            </Row>
            </>
        ))
    )
}

export default Table