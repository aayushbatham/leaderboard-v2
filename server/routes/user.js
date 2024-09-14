const express = require('express')

const router = express.Router();

router.post('/user-profile', async (req, res)=>{
  try{
    const {username} = req.body;
    const user = await User.findOne({username});
    if(!user){
      return res.status(404).json({message: 'User not found'});
    }
    return res.status(200).json(user);

  }catch(err){
    return res.status(500).json({message: 'Internal Server Error'});
  }
})

module.exports = router;