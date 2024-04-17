// استدعاء مكتبات Express و http و socket.io و path
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

// إنشاء تطبيق Express
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// تعيين منفذ الخادم
const PORT = process.env.PORT || 3000;

// تقديم الملفات الثابتة في الفولدر public
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// استماع لاحداث الاتصال بالسوكيت
io.on('connection', (socket) => {
    console.log('A user connected');

    // انضمام المستخدم إلى غرفة الدردشة عند الاتصال
    socket.on('joinRoom', () => {
        socket.join('room1');
    });

    // مغادرة المستخدم لغرفة الدردشة عند الانسحاب
    socket.on('leaveRoom', () => {
        socket.leave('room1');
    });

    // معالجة الفعاليات عند فقدان المستخدم للاتصال
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// تشغيل السيرفر على المنفذ المحدد
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
