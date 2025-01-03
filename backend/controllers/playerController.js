import UserModel from "../models/User.js";

export const getPlayerInfo = (req, res) => {
    const userId = req.id || req.params.id;
    // console.log('id: '+ req.params.id)
    UserModel.findOne({_id: userId})
        .then(user => {
            if (user){
                res.json({name: user.name, rating: user.rating, id: user._id})
            }
            else {
                res.status(404).json("User not found!");
            }
        })
        .catch(err => {
            console.log(err);
            res.json(err)
        });
}

