module.exports = function(req, res, next) {

  if(!req.user.isAdmin) return res.status(403).send("Access Denied. Only for administrators");

  next();
  
}
