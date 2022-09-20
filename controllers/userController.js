const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailler = require("../middleware/mailler.js");
const config = require("../config/authConfig");
const db = require('../models');

const User = db.user;

const signup = async (req, res) =>{
    let info = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    }
    try {
      const user = await User.create(info)
      res.send({ message: "User was registered successfully. Please check your email to verify."});
      mailler(user)
    } catch(err) {
      console.log(err); 
      res.status(400).send({ message: err.message });
    }
}


const login = async (req, res) =>{

      await User.findOne({
        where: {
          username: req.body.username
        }
      })
        .then(user => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
    
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );

          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });
    
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
          res.status(200).send({
            phoneOwnerID: user.id,
            username: user.username,
            email: user.email,
            accessToken: token,
          });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
}

const verify = async (req, res) =>{
    
  try {
      await User.update(
          {
            verified: true,
          },
          {
            where: {
              id: req.params.id,
            }
        }
    );
    res.send("Email verified successfully! Now you can login.");
  } catch(err) {
    res.status(400).send({ message: err.message });
    console.log(err); 
  }
}


module.exports = {
    signup,
    login,
    verify
}
