import {useSocket} from '../../context/SocketContext.jsx'
import BattlefieldCell from "./BattlefieldCell.jsx";
import './BattlefieldBoard.css';
// eslint-disable-next-line react/prop-types
function BattlefieldBoard({board = Array(10).fill(Array(10).fill(null))}) {

    const socket = useSocket();
    const handleClick = (i,j) => {
        if (board[i][j] !== null) return;
        socket.emit('shoot',{j,i});
    };
    //----------------------------------------------------------------
    return (
        <>
            <div className="battlefield">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className={`battlefield-row ${rowIndex}`}>
                        {row.map((col, colIndex) => (
                            <BattlefieldCell
                                key={`${rowIndex}-${colIndex}`}
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