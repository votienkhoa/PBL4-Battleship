import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config()

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        // console.log(err)
        if (err) return res.sendStatus(403)
        req.id = payload.id
        next()
    })
}
export default authenticateToken