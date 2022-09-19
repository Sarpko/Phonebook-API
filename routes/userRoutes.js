const { verifySignUp } = require("../middleware");
const userController = require('../controllers/userController.js')
const router = require('express').Router()
const { authJwt } = require("../middleware");

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

  
router.post('/login', userController.login);

router.get('/test', [
    authJwt.verifyToken
], 
userController.allContent
);


module.exports = router


