const chatSocket = (io,socket) => {
    socket.on('send chat', (data) => {
        const rooms = Array.from(socket.rooms);
        io.to(rooms[1]).emit('send chat', data);
    });
}
export default chatSocket;