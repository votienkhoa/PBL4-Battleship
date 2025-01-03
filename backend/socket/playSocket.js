const playSocket = (io, socket, rooms, layouts, turns, count, playersID) => {
    socket.on('turn',() => {
        const roomID = Array.from(socket.rooms)[1];
        if (socket.id !== turns[roomID]) socket.emit('turn', false);
        else socket.emit('turn', true);
    })
    socket.on('shoot',(position) => {
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
        // socket.to(roomID).emit('shoot', position);

        let hit = false;
        enemyLayout.forEach((ship) => {
            if (position.j >= ship.x &&
                position.j <= ship.x + ship.w -1 &&
                position.i >= ship.y &&
                position.i <= ship.y + ship.h -1
            ){
                ship.size --;
                if (ship.size === 0){
                    socket.to(roomID).emit('self sunk', {position: ship, status: "sunk"});
                    socket.emit('enemy sunk', {position: ship, status: "sunk"});
                    count[roomID][enemyID()] --;

                }
                else{
                    socket.to(roomID).emit('self', {position: position, status: "hit", type: "self"});
                    socket.emit('enemy', {position: position, status: "hit", type: "enemy"});
                }
                hit = true;
            }
        })
        if (count[roomID][enemyID()] === 0){
            io.to(roomID).emit('game over', {winner: socket.id});
            socket.emit('game over', {winner: socket.id});
            delete rooms[roomID];
            delete layouts[roomID];
            delete turns[roomID];
            delete count[roomID];
        }
        if (!hit){
            turns[roomID] = enemyID();
            socket.to(roomID).emit('self', {position: position, status: "miss"});
            socket.emit('enemy', {position: position, status: "miss"});
        }
    })
    socket.on('leave game', () => {
        const roomID = Array.from(socket.rooms)[1];
        socket.to(roomID).emit('opponent disconnected');
        const enemyID = rooms[roomID].find(playerId => playerId !== socket.id);
        const opponentSocket = io.sockets.sockets.get(enemyID);
        if (opponentSocket) opponentSocket.leave(roomID)

        socket.leave(roomID)
        delete rooms[roomID]
        delete layouts[roomID];
        delete turns[roomID];
        delete count[roomID];
        delete playersID[roomID];
        console.log(`User leave game: ${socket.id}`);
    })

}
export default playSocket;