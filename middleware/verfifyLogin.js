const db = require("../models");
const mailler = require("./mailler");
const User = db.user;

checkVerifyEmail = (req, res, next) => {
    console.log("inside check verify")
    User.findOne({
        where: {
        username: req.body.username
        }
    }).then(user => {
        console.log("user")
        console.log(user.verified)
        if (user.verified == false) {
        res.status(400).send({
            message: "Email not verified. We send you a mail again. Please verify your email from your mailbox"
        });
        mailler(user)
        return;
        }
        next();
    });
};

const verifyLogin = {
    checkVerifyEmail: checkVerifyEmail,
};

module.exports = verifyLogin;