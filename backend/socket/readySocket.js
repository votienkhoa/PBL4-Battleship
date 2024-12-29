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
        socket.to(roomID).emit('enemy ready', true);
        if (layouts[roomID[1]].length === 2) {
            io.to(roomID[1]).emit('game start');
        }
    })
    socket.on('enemy ready status', () => {
        const roomID = Array.from(socket.rooms)[1];
        if (layouts[roomID] && layouts[roomID].length === 1) {
            socket.emit('enemy ready', true)
        }
        else socket.emit('enemy ready', false)
    })
}
export default readySocket;