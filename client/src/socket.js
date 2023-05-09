import { io } from 'socket.io-client';



// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://localhost:5000';
const socket = io(URL, {
    secure: true,
    reconnection: true,
    rejectUnauthorized: false,
});
export default socket;