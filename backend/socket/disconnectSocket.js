const disconnectSocket = (io, socket, rooms, layouts, turns, count, playersID) => {
    socket.on('disconnect', () => {
        let roomID;
        for (const [room, players] of Object.entries(rooms)) {
            if (players.includes(socket.id)){
                roomID = room;
                break;
            }
        }
        socket.to(roomID).emit('opponent disconnected');
        delete rooms[roomID];
        delete layouts[roomID];
        delete turns[roomID];
        delete count[roomID];
        delete playersID[roomID];
        console.log(`User disconnected: ${socket.id}`);
    });
}
export default disconnectSocket;