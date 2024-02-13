import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.smv2_token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized.');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized.');
  }
});

const admin = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      if(req.user.userType === 'admin'){
        next();
      } else {
        res.status(404)
        throw new Error('Not authorized')
      }
      
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized');
  }
});



export { protect, admin };
