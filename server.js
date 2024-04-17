const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path'); // استدعاء مكتبة path للتعامل مع المسارات

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// تقديم الملفات الثابتة
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res) => { res.send("<p>some html</p>") });
app.use('/api', (req, res) => { res.send("<p>some html from api</p>") });
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', () => {
        socket.join('room1');
    });

    socket.on('leaveRoom', () => {
        socket.leave('room1');
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
