import socketio from 'socket.io-client';

const socket = socketio(
    'http://localhost:3333/',
    // 'http://devradar-abel.herokuapp.com',
    {
        autoConnect: false
    }
);

const connect = () => {
    socket.io.opts.query = { 'isWeb': true };
    socket.connect();
};

const disconnect = () => {
    if(socket.connected) socket.disconnect();
};

export {
    socket,
    connect,
    disconnect
};