import express from 'express'
import mongoose from 'mongoose'
import {Server} from "socket.io";
import http from 'http';
import cors from 'cors'
import UserModel from "./models/User.js";

import chatSocket from "./socket/chatSocket.js";
import roomSocket from "./socket/roomSocket.js";
import readySocket from "./socket/readySocket.js";
import playSocket from "./socket/playSocket.js";

const app = express();
const server = http.createServer(app);
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
};

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});
app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect("mongodb+srv://vtkhoaitf:XFP3mo4HH6Okv3gD@pbl4.icisq.mongodb.net/battleshipDB");

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
        .then(user => {
            if (user){
                if (user.password === password){
                    res.json("Success");
                } else {
                    res.json("Invalid Password!");
                }
            }
            else {
                res.json("User not found!");
            }
        })
        .catch(err => res.json(err));
})
app.post('/register', (req,res) => {
    UserModel.create(req.body)
        .then(user => {
            res.json("Success");
        })
        .catch(err => res.json(err));
})

const rooms = {};
const layouts = {};
const turns = {};
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    roomSocket(io,socket,rooms);
    chatSocket(io,socket);
    readySocket(io,socket, layouts, turns);
    playSocket(io,socket, rooms, layouts, turns);

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
})

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});