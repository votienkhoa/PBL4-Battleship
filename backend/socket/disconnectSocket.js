const disconnectSocket = (io, socket, rooms, layouts, turns, count, playersID) => {
    socket.on('disconnect', () => {
        let roomID;
        let enemyID
        for (const [room, players] of Object.entries(rooms)) {
            if (players.includes(socket.id)){
                enemyID = players.find(id => id!== socket.id);
                roomID = room;
                break;
            }
        }
        socket.to(roomID).emit('opponent disconnected',roomID);
        const opponentSocket = io.sockets.sockets.get(enemyID);
        if (opponentSocket) opponentSocket.leave(roomID);
        console.log(enemyID)
        delete rooms[roomID];
        delete layouts[roomID];
        delete turns[roomID];
        delete count[roomID];
        delete playersID[roomID];
        console.log(`User disconnected: ${socket.id}`);

    });
}
export default disconnectSocket;