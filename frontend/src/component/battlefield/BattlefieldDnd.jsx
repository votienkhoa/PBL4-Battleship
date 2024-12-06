import {useEffect, useState} from 'react';
import {useSocket} from '../../context/SocketContext.jsx'
import GridLayout from 'react-grid-layout'
import styled from "@emotion/styled";
import './BattlefieldBoard.css'

const Ship = styled.div`
    border: 1.5px solid rgb(170, 11, 214);
    box-shadow:0 0 0 1px rgb(170, 11, 214) inset;
    background-color: rgba(184, 70, 255,0.1);
`

function BattlefieldDnd({isReady}) {
    const socket = useSocket();
    const [layout, setLayout] = useState([
        { i: "ship-1", x: 0, y: 0, w: 1, h: 1, isBounded: true},
        { i: "ship-2", x: 3, y: 0, w: 2, h: 1, isBounded: true},
        { i: "ship-3", x: 0, y: 3, w: 1, h: 3, isBounded: true},
        { i: "ship-4", x: 3, y: 3, w: 4, h: 1, isBounded: true},
        { i: "ship-5", x: 5, y: 5, w: 5, h: 1, isBounded: true},
    ])
    useEffect(() => {
        if (isReady){
            socket.emit("position", layout);
        }
    }, [isReady]);

    const onDragStop = (layout) => {
        setLayout(layout);
    };
    const flipShip = (e,i) => {
        e.preventDefault();
        const newLayout = layout.map(item => ({...item }));
        newLayout[i].h = layout[i].w;
        newLayout[i].w = layout[i].h;
        if (newLayout[i].y + newLayout[i].h > 9) newLayout[i].y = 9 - newLayout[i].h + 1;
        setLayout(newLayout);
    }

    return (
        <div>
            <GridLayout
                className="layout"
                layout={layout}
                cols={10}
                width={327}
                rowHeight={32.7}
                maxRows={10}
                autoSize={false}
                isResizable={false}
                compactType={null}
                bounded={true}
                margin={[0, 0]}
                preventCollision={true}
                onDragStop={onDragStop}
            >
                <Ship key="ship-1" className="ship" onContextMenu={(e) => flipShip(e,0)}/>
                <Ship key="ship-2" className="ship" onContextMenu={(e) => flipShip(e,1)}/>
                <Ship key="ship-3" className="ship" onContextMenu={(e) => flipShip(e,2)}/>
                <Ship key="ship-4" className="ship" onContextMenu={(e) => flipShip(e,3)}/>
                <Ship key="ship-5" className="ship" onContextMenu={(e) => flipShip(e,4)}/>
            </GridLayout>
        </div>
    );
}

export default BattlefieldDnd;