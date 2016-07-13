var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.post('/', (req, res) => {
  User.findOne({
    username: req.body.user.username
  })
  .then(
    //user exsists
    user => {
      user.authenticate(req.body.user.password, (isMatch) => {
        if(isMatch){
          var token = jwt.sign(user._id, process.env.JWT_SECRET, {
            expiresIn: 60*60*24
          });
           res.json({
             user:userData,
             authToken: token
           });
        }
      });
    },

    //user doesn't exsists
    () => {
      res.status(401).json({
        message: 'We were unable to log you in with thos credentials.'
      });
    }
  );
})
