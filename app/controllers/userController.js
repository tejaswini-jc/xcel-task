const Models=require('../models')
const bcryptjs = require('bcryptjs')

module.exports.register=(req,res)=>{
    const body=req.body
    const password = body.password
    const user=new Models.User(body)

    bcryptjs.genSalt(10)
    .then((salt) => {
        bcryptjs.hash(password, salt)
        .then((encryptedPassword) => {
            user.password = encryptedPassword
            user.save()
            .then((user)=>{
                res.json(user)
            })
            .catch((err)=>{
                console.log(err)
            })
        })
    })
    .catch(err => console.log(err))
}

module.exports.login= async (req, res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
         res.status(400).send('Request missing username or password param');
      }

    try {
          let user = await Models.User.authenticate(email, password)
          res.json(user);
        } catch (err) {
           res.status(400).send('invalid username or password');
        }
}

module.exports.logout = async (req, res) => {   
  const {token,user} = req
  console.log("inside logout toke data and user data",token,user)
    
  Models.AuthToken.destroy({ where: { token } })
    .then((response) => {
        res.status(204).send("token succesfully deleted")
    })
    .catch((err) => {
        res.status(400).send(
            { errors: [{ message: 'not authenticated' }] }
          );
    })
  };

  module.exports.account = async (req,res) => {
     const {user} = req
     res.json(user)
  }

  module.exports.list=(req,res)=>{
    Models.User.findAll({})
    .then((users)=>{
        res.json(users)
    })
    .catch((err)=>{
        console.log(err)
    })
}