import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import {Server} from "socket.io";
import http from 'http';
import cors from 'cors'
import UserModel from "./models/User.js";

import playerRoutes from "./routes/playerRoutes.js";

import chatSocket from "./socket/chatSocket.js";
import roomSocket from "./socket/roomSocket.js";
import readySocket from "./socket/readySocket.js";
import playSocket from "./socket/playSocket.js";
import disconnectSocket from "./socket/disconnectSocket.js";
import jwt from "jsonwebtoken";

const MONGODB_URI = process.env.MONGODB_URI
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET
const PORT = process.env.PORT

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

mongoose.connect(MONGODB_URI);

app.use(playerRoutes)
app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
        .then(user => {
            if (user){
                if (user.password !== password){
                    res.json("Invalid password");
                }
                else{
                    const accessToken = jwt.sign({id: user._id}, ACCESS_TOKEN, {expiresIn: '5m'})
                    res.json({accessToken: accessToken, userId: user._id, rating: user.rating})
                }
            }
            else {
                res.json("User not found!");
            }
        })
        .catch(err => res.json(err));
})
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //----------
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists!' });
        }
        //-----------
        await UserModel.create({ name, email, password });
        res.status(201).json("Success");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred during registration!' });
    }
});

const rooms = {};
const layouts = {};
const turns = {};
const count = {};
const playersID = {};
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    roomSocket(io, socket, rooms, layouts, turns, count, playersID);
    chatSocket(io, socket);
    readySocket(io, socket, layouts, turns, count);
    playSocket(io, socket, rooms, layouts, turns, count, playersID);
    disconnectSocket(io, socket, rooms, layouts, turns, count, playersID);
})

server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});