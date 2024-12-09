const playSocket = (io, socket, rooms, layouts, turns) => {
    socket.on('turn',() => {
        const roomID = Array.from(socket.rooms)[1];
        if (socket.id !== turns[roomID]) socket.emit('turn', false);
        else socket.emit('turn', true);
    })
    socket.on('shoot',(position) => {
        console.log(turns);
        //--------------
        const roomID = Array.from(socket.rooms)[1];

        if (socket.id !== turns[roomID]) {
            socket.emit('turn', false);
            return;
        }
        else socket.emit('turn', true);
        const enemyLayout = layouts[roomID].filter(player => player.id!== socket.id)[0].position;
        const enemyID = () => {
            if (rooms[roomID][0] === socket.id) return rooms[roomID][1];
            return rooms[roomID][0];
        }
        // io.to(roomID).emit('shoot', position);
        socket.to(roomID).emit('shoot', position);

        let hit = false;
        enemyLayout.forEach((ship) => {
            if (position.j >= ship.x &&
                position.j <= ship.x + ship.w -1 &&
                position.i >= ship.y &&
                position.i <= ship.y + ship.h -1
            ){
                socket.to(roomID).emit('self', {position: position, status: "hit", type: "self"});
                socket.emit('enemy', {position: position, status: "hit", type: "enemy"});
                hit = true;
            }
        })
        if (!hit){
            turns[roomID] = enemyID();
            socket.to(roomID).emit('self', {position: position, status: "miss", type: "self"});
            socket.emit('enemy', {position: position, status: "miss", type: "enemy"});
        }
    })

}
export default playSocket;