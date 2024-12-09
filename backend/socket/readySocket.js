const readySocket = (io, socket, layouts, turns) => {
    socket.on('position', (position) => {
        const roomID = Array.from(socket.rooms);
        if (!Array.isArray(layouts[roomID[1]])) {
            layouts[roomID[1]] = [];
            turns[roomID[1]] = socket.id;
        }
        layouts[roomID[1]].push({id: socket.id, position: position});
        socket.to(roomID).emit('enemy ready');
        if (layouts[roomID[1]].length === 2) {
            io.to(roomID[1]).emit('game start');
        }
        console.log(layouts);
    })

}
export default readySocket;