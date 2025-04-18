const bcrypt = require('bcrypt');
const User = require('./../models/user.model');
const tokenUtils = require('./../utils/token.util');


exports.signUp = async ({userName, email, password}) => {
    const existingUser = await User.findOne({email});
    if(existingUser) return null;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({userName, email, password : hashedPassword});
    await newUser.save();


    const accessToken = tokenUtils.generateAccessToken({ id : newUser._id });
    const refreshToken = tokenUtils.generateRefreshToken({ id: newUser._id});

    return { accessToken, refreshToken, newUser};
};


exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match)  return null;

  const accessToken = tokenUtils.generateAccessToken({ id: user._id });
  const refreshToken = tokenUtils.generateRefreshToken({ id: user._id });

  return { accessToken, refreshToken };
};


// exports.logout = async ( res ) => {

//   res.clearCookie('refreshToken', {
//      httpOnly: true,
//     secure: false,
//     sameSite: 'Strict'
//   })
// }


exports.refresh = async ( refreshToken ) => {
    const user = tokenUtils.verifyRefreshToken(refreshToken);
    console.log(user.id);
    
    const newAccessToken = tokenUtils.generateAccessToken({ id : user.id});
    
    
    return newAccessToken;
}