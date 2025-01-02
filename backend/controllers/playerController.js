import UserModel from "../models/User.js";

export const getPlayerInfo = (req, res) => {
    const userId = req.user.id;
    UserModel.findOne({_id: userId})
        .then(user => {
            if (user){
                res.json({name: user.name, rating: user.rating})
            }
            else {
                res.status(404).json("User not found!");
            }
        })
        .catch(err => res.json(err));
}

