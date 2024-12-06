import {useEffect, useState} from 'react';
import {useSocket} from '../../context/SocketContext.jsx'
import BattlefieldCell from "./BattlefieldCell.jsx";
import './BattlefieldBoard.css';

function BattlefieldBoard() {

    const tmpBoard = [
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, 'S' , 'S' , 'S' , null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, 'S' , null, null, null, 'S' , 'S' , null],
        [null, 'S' , null, 'S' , null, null, null, null, null, null],
        [null, 'S' , null, 'S' , null, null, 'S' , 'S' , null, null],
        [null, 'S' , null, 'S' , null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, 'S' , 'S' , 'S' , 'S' , 'S' , null, null]
    ];
    const [board, setBoard] = useState(Array(10).fill(Array(10).fill(null)));
    const [ship, setShip] = useState(tmpBoard);
    const socket = useSocket();
    // function checkIfShipSunk(tmpShip,i,j){
    //     const visited = Array(10).fill(null).map(() => Array(10).fill(false));
    //     return isShipSunk(tmpShip,i,j,visited);
    // }
    const handleClick = (i,j) => {
        socket.emit('shoot',{i,j});
    };
    //----------------------------------------------------------------
    return (
        <>
            <div className="battlefield">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className={`battlefield-row ${rowIndex}`}>
                        {row.map((col, colIndex) => (
                            <BattlefieldCell
                                key={colIndex}
                                posX={rowIndex}
                                posY={colIndex}
                                value={board[rowIndex][colIndex]}
                                onCellClick={() => handleClick(rowIndex,colIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <br/>
        </>

    );
}

export default BattlefieldBoard;