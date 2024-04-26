import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
 import { CellId, ICell } from "../hooks/gameContext";


interface ITable {
    state: ICell[][];
    onClick: (cellId: CellId) => Promise<any>;
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
    margin-left:50px;
`

const Table: React.FC<ITable> = ({state, onClick}) => {
    return (
        state.map((line, index) => (
            <div style={{marginTop:20}}>
            <Row key={index}>
                {line.map(({id, value}) => (
                    <Cell key={id} onPress={() => onClick(id)}>
                        <Text>{value}</Text>        
                    </Cell>
                ))}
            </Row>
            </div>
        ))
    )
}

export default Table