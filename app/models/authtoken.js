'use strict';
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define('AuthToken', {
    token: DataTypes.STRING
  }, {});
  
  AuthToken.associate = function(models) {
    AuthToken.belongsTo(models.User)
  };

  AuthToken.generate = async function(user, UserId) { 
    
    let tokenData = {
       id : user.id,
       lastname : user.lastname
    }

    const token = jwt.sign(tokenData,"jwt@123",{expiresIn: 60 })    
    return AuthToken.create({ token, UserId })
  }
  return AuthToken;
};