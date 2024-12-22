const readySocket = (io, socket, layouts, turns, count) => {
    socket.on('position', (position) => {
        position.forEach((ship) => {
            ship.size = Math.max(ship.w, ship.h);
        })
        const roomID = Array.from(socket.rooms);
        if (!Array.isArray(layouts[roomID[1]])) {
            count[roomID[1]] = {};
            layouts[roomID[1]] = [];
            turns[roomID[1]] = socket.id;
        }
        count[roomID[1]][socket.id] = 5;
        layouts[roomID[1]].push({id: socket.id, position: position});
        socket.to(roomID).emit('enemy ready');
        if (layouts[roomID[1]].length === 2) {
            io.to(roomID[1]).emit('game start');
        }
    })

}
export default readySocket;