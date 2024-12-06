const readySocket = (io, socket, layouts) => {
    socket.on('position', (position) => {
        const roomID = Array.from(socket.rooms);
        if (!Array.isArray(layouts[roomID[1]])) {
            layouts[roomID[1]] = [];
        }
        layouts[roomID[1]].push({id: socket.id, position: position});
        if (layouts[roomID[1]].length === 2) {
            io.to(roomID[1]).emit('game start');
        }
        console.log(layouts);
    })

}
export default readySocket;