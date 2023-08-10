import User from "../models/User.js";
import validator from "validator";
import bcrypt from "bcrypt";

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const salt = await bcrypt.genSalt(10)
const getAll = async (req, res) => {
  try {
    let users = await User.find({});
    if (!users) {
      return res.status(404).json({ message: "No user Found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const signup = async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: `please enter valid email` });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: `password is not strong enough` });
  }
  const hashedPassword = await bcrypt.hash(password,salt)
  password = hashedPassword
  try {
    const emailExistance = await User.findOne({ email });
    if (emailExistance) {
      res.status(400).json({ message: `email already registerd` });
    }
    
    const user = await User.create({
      name,
      email,
      password,
      blogs : []
    });
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailExistance = await User.findOne({ email });

    if (!emailExistance) {
      return res.status(404).json({ message: `couldn't find email` });
    }

    const surePassword = await bcrypt.compare(password , emailExistance.password)
    if (!surePassword) {
      return res.status(400).json({ message: "Incorect password" });
    }
    res.status(200).json({message: "Logged in" , user : emailExistance})
  } catch (error) {
    console.log(error);
  }
};

export { getAll, signup, login };
