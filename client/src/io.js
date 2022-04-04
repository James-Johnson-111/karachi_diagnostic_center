import io from 'socket.io-client';

const socket = io.connect('https://localhost:8080/', { autoConnect: true });

export default socket;