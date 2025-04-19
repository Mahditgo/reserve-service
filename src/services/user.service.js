const User = require('./../models/user.model');
const sendResetPasswordEmail = require('./../utils/emailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


exports.getAllUsers =  async() => {
    const users = await User.find();
    if(!users) throw new Error('No user found');
    return users;
}


exports.getUserById = async(id) => {
    const user = await User.findById(id);

    if(!user) throw new Error('No user founded with that id');
    return user;
};


exports.updatePassword = async (userId, currentPassword, newPassword) => {
    // console.log(req.user);

     if (!currentPassword || !newPassword) {
        throw new Error('All fields are required');
    }

    const user = await User.findById(userId);
     if(!user) throw new Error('User not found');

     const isMatch = await bcrypt.compare(currentPassword, user.password);
     if(!isMatch) throw new Error('Your current password is incorrect');

     const hashedPassword = await bcrypt.hash(newPassword, 10);
     user.password = hashedPassword;
     await user.save();

     return true;
};


exports.forgotPassword = async (email, req) => {
    if (!email) {
        const error = new Error('Email is required')
        error.status = 400;
        throw error;
    }

      const user = await User.findOne({ email });
        if (!user) {
        const error = new Error('Invalid user');
        error.status = 400;
        throw error;
  }

    const resetToken = await crypto.randomBytes(20).toString('hex');
    console.log(resetToken);
    
    user.passwordResetToken  = resetToken;
    console.log(user.passwordResetToken );
    
    user.passwordResetExpires = Date.now() + 3600000; //1h
    await user.save();
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    await sendResetPasswordEmail.sendResetPasswordEmail(email, resetURL);

    return 'Password reset link sent to your email';
};




exports.resetPassword = async (resetToken, newPassword) => {
  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    const error = new Error('User not found or token expired');
    error.status = 404;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  return 'Password updated successfully';
};
