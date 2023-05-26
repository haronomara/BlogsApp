import User from "../models/User";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const signup = async (reg,res,next)=>{
    const{name,email,password} = reg.body;
    if (!name &&name.trim()==="" &&!email &&email.trim()==="" &&!password &&password.trim()==="") {
        return res.status(404).json({message:"Invalid Input"})
    }
//     let existingUser;
//    try {
//     existingUser = await User.find()
//    } catch (err) {
//     return console.log(err);
//    }
// if (existingUser) {
//     return res.status(404).json({message:"User already exist"})
// }
    
    let user;
    const hashPassword = bcrypt.hashSync(password)
    try {
      user = new User({
        name,
        email,
        password:hashPassword,
        blogs:[]
      })  
      user = await user.save()
    } catch (err) {
     return console.log(err);  
    }
    if (!user) {
        return res.status(500).json({message:"Unexpected Error"})
    }
    return res.status(200).json({user})
}

export const login = async (reg,res,next)=>{
    const{email,password} = reg.body;
    if (!email &&email.trim()==="" &&!password &&password.trim()==="") {
        return res.status(404).json({message:"Invalid Input"})
    }
    let existinguser;
    try {
       existinguser = await User.findOne({email}) 
    } catch (err) {
       return console.log(err);
    }
    if (!existinguser) {
        return res.status(500).json({message:"User does not exist please signup"})
    }
    const PasswordIsCorrect = bcrypt.compareSync(password,existinguser.password)
    if (!PasswordIsCorrect) {
        return res.status(500).json({message:"Incorrect Password or email"})
    }
    var token = jwt.sign({user:existinguser._id}, `${process.env.JWT_PRIVATE_KEY}`, { expiresIn: '29d' });
    return res.status(200).json({message:"login Successfull",token,user:existinguser._id})
}
export const getUsers = async (reg,res,next)=>{
    let users;
    try {
        users = await User.find()
    } catch (err) {
        return console.log(err);
    }
    if (!users) {
        return res.status(500).json({message:"Unable to Find Users"})
    }
    return res.status(201).json({users})
}