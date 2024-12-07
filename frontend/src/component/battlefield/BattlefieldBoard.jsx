import {useSocket} from '../../context/SocketContext.jsx'
import BattlefieldCell from "./BattlefieldCell.jsx";
import './BattlefieldBoard.css';
function BattlefieldBoard({board = Array(10).fill(Array(10).fill(null))}) {

    const socket = useSocket();
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