import express from 'express';
import cors from 'cors';
import connectDb from './config';
import userRoutes from './routes/user';
import { Server, Socket } from 'socket.io';
import http from 'http';

connectDb();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
}
)
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

io.on("connection", (socket: Socket) => {

    socket.on("joinRoom", (room) => {
        socket.join(room);
    });

    socket.on("sendMessage", ({ room, message }) => {
        io.to(room).emit(message);
    })

    socket.on("disconnect", () => {
        console.log("user  disconnect")

    })
})

server.listen(3000, () => {
    console.log("Server is running")
})
