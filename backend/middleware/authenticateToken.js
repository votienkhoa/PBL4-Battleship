import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401)

    jwt.verify(token, 'somekeyidk', (err, payload) => {
        // console.log(err)
        if (err) return res.sendStatus(403)
        req.id = payload.id
        next()
    })
}
export default authenticateToken