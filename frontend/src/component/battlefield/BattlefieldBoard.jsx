import {useState} from 'react';
import GridLayout from "react-grid-layout";
import BattlefieldCell from "./BattlefieldCell.jsx";
import './BattlefieldBoard.css';
import BattlefieldDnd from "./BattlefieldDnd.jsx";

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
    function handleClick(i,j){
        if (board[i][j] != null) return;
        const nextBoard = board.map(row => [...row]);
        const nextShip = ship.map(row => [...row]);

        const currenLocation = ship[i][j];
        let isSunk = false;
        let newStatus;
        if (currenLocation == null){
            newStatus = "miss";
        }
        else if (currenLocation === 'S'){
            newStatus = "hit";
            nextShip[i][j] = 'D';
            if (checkIfShipSunk(nextShip,i,j)){
                console.log('Ship sunk!');
                isSunk = true;
            }
        }
        nextBoard[i][j] = newStatus;
        if (isSunk === true) setShipSunk(nextShip, i, j, nextBoard);

        setBoard(nextBoard);
        setShip(nextShip);
    }
    function checkIfShipSunk(tmpShip,i,j){
        const visited = Array(10).fill(null).map(() => Array(10).fill(false));
        return isShipSunk(tmpShip,i,j,visited);
    }
    function setShipSunk(tmpShip,i,j,nextBoard){
        const visited = Array(10).fill(null).map(() => Array(10).fill(false));
        markSunk(tmpShip,i, j, visited,nextBoard);
    }
    function isShipSunk(tmpShip, i, j, visited){
        let sunk = true;

        if (i > 9 || i < 0 || j > 9 || j < 0) return true;
        if (tmpShip[i][j] === null || visited[i][j] === true) return true;
        if (tmpShip[i][j] === 'S') return false;

        visited[i][j] = true;

        sunk &= isShipSunk(tmpShip,i+1, j, visited);
        sunk &= isShipSunk(tmpShip,i-1, j, visited);
        sunk &= isShipSunk(tmpShip,i, j+1, visited);
        sunk &= isShipSunk(tmpShip,i, j-1, visited);

        return sunk;
    }
    function markSunk(tmpShip, i, j, visited, nextBoard){
        if (i > 9 || i < 0 || j > 9 || j < 0) return;
        if (tmpShip[i][j] !== 'D' || visited[i][j] === true) return;

        visited[i][j] = true;
        nextBoard[i][j] = "Sunk";

        markSunk(tmpShip, i + 1, j, visited, nextBoard);
        markSunk(tmpShip, i - 1, j, visited, nextBoard);
        markSunk(tmpShip, i, j + 1, visited, nextBoard);
        markSunk(tmpShip, i, j - 1, visited, nextBoard);
    }

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