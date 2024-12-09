const roomSocket = (io, socket, rooms) => {
    let ID;
    socket.on('create room', () => {
        ID = Math.floor(100000 + Math.random() * 900000).toString();
        rooms[ID] = [socket.id];
        socket.join(ID);
        socket.emit('room created', ID);
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
    socket.on('roomID', () => {
        socket.emit('roomID', Array.from(socket.rooms)[1])
    })
}
export default roomSocket;