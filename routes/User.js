var express = require('express');
var router = express.Router();
var UserCtrl = require("./../app/controller/User");

/* step-4 parse token using passport and set as req.user */
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var jsonwebtoken = require('jsonwebtoken');
passport.use(new Strategy(
  function(token, callback) {
    jsonwebtoken.verify(token, 'shhhhh', function(err, decoded) {
      if (err) {
        console.log(err);
        callback('Invalid token');
      } else {
        console.log(decoded)
        callback(false, decoded);
      }
    });
}));


router.get('/getUser', UserCtrl.getUser);

router.get('/:id', UserCtrl.getUserById);
router.delete('/removeUser/:id',UserCtrl.removeUser);
router.post('/addUser', UserCtrl.addUser);
router.post('/updateUser/:id',UserCtrl.updateUser);
router.post('/register',UserCtrl.regUser);
router.post('/login',UserCtrl.logUser);
module.exports = router;
