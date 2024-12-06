const roomSocket = (io, socket, rooms) => {
    socket.on('create room', () => {
        const roomID = Math.floor(100000 + Math.random() * 900000).toString();
        rooms[roomID] = [socket.id];
        socket.join(roomID);
        socket.emit('room created', roomID);
        io.to(roomID).emit("room status", roomID);
    })
    socket.on("join room", (ID) => {
        const currentRoom = rooms[ID];
        if (!currentRoom){
            socket.emit('error', 'Room does not exist!');
            return;
        }
        if (currentRoom.length === 2){
            socket.emit('error', "Room full!");
            return;
        }

        currentRoom.push(socket.id);
        socket.join(ID);
        socket.emit('room joined');
        io.to(ID).emit("room status", "xeeps tauf di dcm");
        console.log(rooms);
    })
}
export default roomSocket;