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

checkAlreadyVerify = (req, res, next) => {
    console.log("inside check verify")
    User.findOne({
        where: {
        id: req.params.id
        }
    }).then(user => {
        if (user.verified == true) {
        res.status(400).send({
            message: "Email already verified"
        });
        return;
        }
        next();
    });
};

const verifyLogin = {
    checkVerifyEmail: checkVerifyEmail,
    checkAlreadyVerify: checkAlreadyVerify,
};

module.exports = verifyLogin;
