const User = require("../../models/User")
const bcrypt = require("bcrypt")
const { body } = require("express-validator")
const jwt = require("jsonwebtoken")
const { generateToken } = require("../../common/middleware/auth")
const router = require("../../routes")
const { use } = require("../../routes")


const refreshTokens = []

/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */

exports.register = function(req, res, next){    
    User.findOne({email: req.body.email}, (err, user) => {
        if(user == null){ //Kiểm tra xem email đã được sử dụng chưa
            bcrypt.hash(req.body.password, 10, function(err, hash){ //Mã hóa mật khẩu trước khi lưu vào db
                if (err) {return next(err);}
                const user = new User(req.body)
                user.role = 'customer' //sau khi register thì role auto là customer
                user.password = hash;
                user.password_confirm = hash;
                user.save((err, result) => {
                    if(err) {return res.json({err: "error"})}
                    res.json({user: result})
                })
            })
        }else{
            res.json({err: 'Email has been used'})
        }
    })
}

exports.login = async function(req,res) {
  try {
      const user = await User.findOne({email: req.body.email})
      bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result === true ) {
              const token = generateToken(user)
              const refreshToken = jwt.sign({ username: user.username, role: user.role }, process.env.refreshTokenSecret)    
              refreshTokens.push(refreshToken)        
              req.session.user = user
              res.json({
                 token,
                 refreshToken
              })
          } else {
              return res.json({err: "email or password are incorrect"})
          }
      })
  } catch (error) {
    res.status(404)
    res.json(error)
  }
}

exports.logout = async function(req, res) { 
    try {
        req.session.destroy(() => {
            res.json({'logout': "success"})
        }) 
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

exports.profile = async function(req, res) {
    try {
        const profile = await User.findOne({_id: req.params.id})
        res.json({data: profile})
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

exports.getallusers = async function(req, res) {
    try {
        const users = await User.find()
        console.log(users)
        res.json({data: users})
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

exports.token  = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = generateToken(user)

        res.json({
            accessToken
        });
    });
}