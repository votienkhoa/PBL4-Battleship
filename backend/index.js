import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import UserModel from "./models/User.js";

const app = express();
app.use(express.json());
app.use(cors());

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

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})