const personController = require('../controllers/personController.js')
const router = require('express').Router()
const { authJwt } = require("../middleware");

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post('/addPerson', [
    authJwt.verifyToken,
  ], 
  personController.addPerson
  );

  router.get('/listPersons', [
    authJwt.verifyToken,
  ], 
  personController.listPersons
  );

  router.delete('/deletePerson', [
    authJwt.verifyToken,
  ], 
  personController.deleteSinglePerson
  );

  router.put('/updatePerson', [
    authJwt.verifyToken,
  ], 
  personController.updateSinglePerson
  );

  router.get('/findPerson', [
    authJwt.verifyToken,
  ], 
  personController.findPerson
  );


module.exports = router


