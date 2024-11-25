import {useState} from 'react';
import GridLayout from 'react-grid-layout'
import './BattlefieldBoard.css'

function BattlefieldDnd() {
    const [layout, setLayout] = useState([
        { i: "ship-1", x: 0, y: 0, w: 2, h: 1, isBounded: true},
        { i: "ship-2", x: 3, y: 0, w: 3, h: 1, isBounded: true},
    ])

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
                width={508}
                rowHeight={50.8}
                maxRows={10}
                autoSize={false}
                isResizable={false}
                compactType={null}
                bounded={true}
                margin={[0, 0]}
                preventCollision={true}
                onDragStop={onDragStop}
            >
                <div key="ship-1" className="ship" onContextMenu={(e) => flipShip(e,0)}>
                    🚢 Ship 1
                </div>
                <div key="ship-2" className="ship" onContextMenu={(e) => flipShip(e,1)}>
                    🚢 Ship 2
                </div>
            </GridLayout>
        </div>
    );
}

export default BattlefieldDnd;