const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', () => {
        socket.join('room1'); // انضم إلى الغرفة
    });

    socket.on('leaveRoom', () => {
        socket.leave('room1'); // انسحب من الغرفة
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
