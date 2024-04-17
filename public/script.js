const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
let localStream;
let remoteStream;
let localVideo = document.getElementById('localVideo');
let remoteVideo = document.getElementById('remoteVideo');


startButton.addEventListener('click', startChat);
stopButton.addEventListener('click', stopChat);

// تأكد من استخدام wss بدلاً من ws إذا كنت تستخدم HTTPS
let socket = io({
    // استخدم wss بدلاً من ws إذا كنت تستخدم HTTPS
    secure: true
});


async function startChat() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;

        socket.emit('joinRoom'); // انضم إلى غرفة الدردشة

        socket.on('remoteStream', function (stream) {
            remoteStream = stream;
            remoteVideo.srcObject = remoteStream;
        });

    } catch (error) {
        console.error('Error starting chat:', error);
    }
}

function stopChat() {
    socket.emit('leaveRoom'); // انسحاب من الغرفة
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }
    if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
    }
}
