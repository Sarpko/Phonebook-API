const { verifySignUp,verifyLogin } = require("../middleware");
const userController = require('../controllers/userController.js')
const router = require('express').Router()

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post('/register', [
    verifySignUp.checkDuplicateUsernameOrEmail,
  ], 
    userController.signup
  );

  
router.post('/login', [
    verifyLogin.checkVerifyEmail,
  ], 
    userController.login
  );

router.get('/verify/:id',  [
  verifyLogin.checkAlreadyVerify,
  ], 
    userController.verify
  );

module.exports = router


