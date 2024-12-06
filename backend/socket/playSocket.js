const playSocket = (io, socket, rooms, layouts) => {
    socket.on('shoot',(position) => {
        console.log(socket.rooms);
        console.log(position);
        //--------------
        const roomID = Array.from(socket.rooms)[1];
        const enemyLayout = layouts[roomID].filter(player => player.id!== socket.id)[0].position;
        console.log(enemyLayout);
        // io.to(roomID).emit('shoot', position);
        socket.to(roomID).emit('shoot', position);
        let hit = false;
        enemyLayout.forEach((ship) => {
            if (position.i >= ship.x &&
                position.i <= ship.x + ship.w -1 &&
                position.j >= ship.y &&
                position.j <= ship.y + ship.h -1
            ){
                io.to(roomID).emit('hit', position);
                hit = true;
            }
        })
        if (!hit){
            io.to(roomID).emit('miss', position);
        }
    })

}
export default playSocket;