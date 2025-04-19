const userService = require('./../services/user.service');

exports.getAllUsers = async (req, res ) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({users});
        
    } catch (error) {
         res.status(403).json({ message: 'Invalid refresh token' });
    }
};


exports.getUserById = async ( req, res) => {
    try {
        
        const { id } = req.params;
    
        const user = await userService.getUserById(id);
        
        
        res.status(200).json({user})
    } catch (error) {
        console.log(error.message);
         res.status(403).json({ message: 'Internal servere Error' });
    }
};


exports.updatePassword = async (req, res) => {
    console.log(req.user);
  const { currentPassword, newPassword } = req.body;

  
  try {
      console.log( req.user.id);
    await userService.updatePassword(req.user.id, currentPassword, newPassword);
    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
     console.log(error.message);
    res.status(403).json({ message: 'Internal servere Error' });
  }
};



exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await userService.forgotPassword(email, req);
    res.status(200).json({ success: true, message: response });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};


exports.resetPassword = async (req, res) => {
  const { resetToken } = req.params;
//   console.log(resetToken);
  
  const { newPassword } = req.body;

  try {
    const response = await userService.resetPassword(resetToken, newPassword);
    res.status(200).json({ success: true, message: response });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};