import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import generateToken from '../helper/generateToken.js'

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if(!user){
        res.status(401)
        throw new Error('Invalid credentials')
    }
    const passwordCheck = await user.matchPassword(password)

    if(!passwordCheck){
        res.status(401)
        throw new Error('Invalid credentials')
    }

    generateToken(res, user._id);
    const data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
    }

    res.status(200).json(data)

  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

const logoutUser = (req, res) => {

  try {
    res.cookie('smv2_token', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
  
};

const authCheck = asyncHandler(async (req, res) => {
  try {
    res.status(200).send('ok')
  } catch (error) {
    res.status(403)
    throw new Error('expires')
  }
});

export {
    loginUser,
    logoutUser,
    authCheck,
}