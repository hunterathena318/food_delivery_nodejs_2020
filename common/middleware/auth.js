const jwt = require("jsonwebtoken")
const User = require("../../models/User")

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {  
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: "No token provide"
                });
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

const generateToken = (user) => {
    return jwt.sign({user}, process.env.JWT_KEY, {expiresIn: '20m'})
}

const authMiddleware = {
    auth,
    generateToken
}
 module.exports = authMiddleware
 

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