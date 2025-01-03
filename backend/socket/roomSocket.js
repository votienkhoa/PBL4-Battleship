const roomSocket = (io, socket, rooms, layouts, turns, counts, playersID) => {
    let ID;
    socket.on('create room', (playerId) => {
        ID = Math.floor(100000 + Math.random() * 900000).toString();
        rooms[ID] = [socket.id];
        socket.join(ID);
        playersID[ID] = {}
        playersID[ID][socket.id] = playerId;
        socket.emit('room created', ID);
    })
    socket.on("join room", (data) => {
        const currentRoom = rooms[data.ID];
        if (!currentRoom){
            socket.emit('error', 'Room does not exist!');
            return;
        }
        if (currentRoom.length === 2){
            socket.emit('error', "Room full!");
            return;
        }
        socket.join(data.ID);
        currentRoom.push(socket.id);
        playersID[data.ID][socket.id] = data.playerID;
        socket.emit('room joined'); //thong bao vao phong thanh cong
        socket.to(data.ID).emit('enemy joined'); //thong bao co nguoi vao phong
        console.log(rooms);
        console.log(playersID);
    })
    socket.on('roomID', () => {
        socket.emit('roomID', Array.from(socket.rooms)[1])
    })
    socket.on('room info', () => {
        const roomID = Array.from(socket.rooms)[1];
        if (rooms[roomID]) socket.emit('room info', rooms[roomID].length)
    })
    socket.on('enemy info', () => {
        const roomID = Array.from(socket.rooms)[1];
        if (playersID[roomID]){
            const socketIds = Object.keys(playersID[roomID])
            const enemySocket = socketIds.find(id => id!== socket.id)
            if (enemySocket) socket.emit('enemy info', playersID[roomID][enemySocket])
        }
    })
    socket.on('leave room', () => {
        const roomID = Array.from(socket.rooms)[1]

        for (const [roomId, players] of Object.entries(rooms)) {
            if (players.includes(socket.id)) {
                rooms[roomId] = players.filter(playerId => playerId !== socket.id);

                if (rooms[roomId].length === 0) {
                    delete rooms[roomId];
                    console.log(`Phòng ${roomId} đã bị xóa do không còn người chơi.`);
                }
            }
        }
        // xoa trong layouts
        for (const [roomId, layout] of Object.entries(layouts)) {
            layouts[roomId] = layout.filter(player => player.id !== socket.id);
            if (layouts[roomId].length === 0) {
                delete layouts[roomId];
            }
        }

        // xoa trong turns
        for (const [roomId, turn] of Object.entries(turns)) {
            if (turn === socket.id) {
                delete turns[roomId];
            }
        }
        // xoa trong counts
        for (const [roomId, count] of Object.entries(counts)) {
            if (count[socket.id]) {
                delete counts[roomId];
            }
        }

        // xoa trong playersID
        for (const [roomId, players] of Object.entries(playersID)) {
            if (players[socket.id]) {
                delete players[socket.id];
            }
            if (Object.keys(players).length === 0) {
                delete playersID[roomId];
            }
        }
        socket.to(roomID).emit('enemy leave');
        socket.leave(roomID);
    })
}
export default roomSocket;