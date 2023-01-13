const { User } = require('../models');

class UsersRepository {


  findOneUser = async (userId) => {
    const findOneUser = await User.findOne({ where: { userId } });

    return findOneUser;
  };
  findOneId = async (username) => {
    const findOneId = await User.findOne({ where: { username } });

    return findOneId;
  };
  
  
    createUser = async (username, password) => {
      console.log(username,password)
      const createUser = await User.create({ username, password });
  
      return createUser;
    }
    updateRefresh = async (refreshToken, user) => {
      await User.update({ refreshToken }, { where: { userId: user.userId } });
    };


    
  
  }
  
  module.exports = UsersRepository;