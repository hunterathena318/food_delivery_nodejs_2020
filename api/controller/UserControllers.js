const User = require("../../models/User")
const bcrypt = require("bcrypt")
const { body } = require("express-validator")
const jwt = require("jsonwebtoken")

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
              const token = jwt.sign({ email: user.email, username: user.username, _id: user._id}, process.env.JWT_KEY)                     
              req.session.user = user
              res.json({
                  user: user,
                  "message": "login success",
                  token: token
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