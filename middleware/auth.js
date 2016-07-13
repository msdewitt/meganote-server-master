module.exports = (req, res, next) => {
  if(isLoggingInOrSigningUp(req)){
    next();
    return;
  }
  const token = req.headers.authorization;
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
      if(!decodedPayload){
        res.status(401).json({
          message: 'Authentication required.'
        });
        return;
      }
    User
      .findOne({_id: decodedPayload._id})
      .then(
        user => {
          if(user){
            //add the user to the request
            req.user = user;
            next();
          }
          else{
            res.status(401).json({
              message: 'Authentication required.'
            });
            return;
          }
        }
      )
    })
  }
  else {
    res.status(401).json({
      message: 'Authentication required.'
    });
  }
};
function isLoggingInOrSigningUp(req){
  if(req.method.toLowerCase() !== 'post'){
    next();
    return false;
  }
  const loggingIn = req.originalUrl.includes('sessions');
  const signingUp = req.originalUrl.includes('users');
  return(loggingIn || signingUp);
}
function isPreflight(req){
  return (req.method.toLowerCase() === 'options');
}
