const express=require("express")
const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
  
    const token = req.headers['x-access-token'];
    console.log(token,authMiddleware)
  if (!token) {
    return res.status(401).json({ status: 'error', error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded; 
    next();
  } 
     catch (err) {
    console.error(err);
    return res.status(401).json({ status: 'error', error: 'Invalid token' });
  }
};
module.exports = authMiddleware;
