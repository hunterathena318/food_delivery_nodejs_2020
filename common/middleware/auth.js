const jwt = require("jsonwebtoken")
const User = require("../../models/User")

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}


 module.exports = auth
 

// const auth = async function (req, res, next) { 
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '')
//         const data = await jwt.verify(token, process.env.JWT_KEY)
//         req.user = data
//         // req.token = token
//         next()
//     } catch (error) {
//         res.status(401).send({ error: 'Not authorized to access this resource' })
//     }   

//  }