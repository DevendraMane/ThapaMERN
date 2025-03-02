//* Controllers

//? In an Express.js application, a "controller" refers to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responses back to clients. They help organize your application by separating concerns and following the MVC (Model-View-Controller) design pattern.

import User from "../models/user-model.js";

import bcrypt from "bcryptjs";

// ****** HOME CONTROLLER ****** //
const home = async (req, res) => {
  try {
    res.status(200).json({ message: "Hello Server this is from Router" });
  } catch (error) {
    res.status(404).json({ msg: "Page not found" });
  }
};
// ------ HOME CONTROLLER ------ //

// ****** REGISTER CONTROLLER ****** //
const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    //***********hash the password AND newUser Creation*********//
    // todo: Method 1
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    // const userCreated = await User.create({
    //   username,
    //   email,
    //   phone,
    //   password: hash_password,
    // });
    // res.status(200).json({ message: userCreated });

    // todo: Method 2

    // step1: for creating new user
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });
    // step2: Check the user-model.js file
    res.status(200).json({
      //? message: userCreated, (<---We are not doing this bcoz we don't send data in this way to the console after succeseful registration of the user)
      message: "Registration Successful✅",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    }); //?The generateToken() function here, is defined in user-model.js file
    // todo: converting _id --> toSting is a good practice for better consistency
    //------------hash the password AND newUser Creation----------//
  } catch (error) {
    res.status(404).json({ msg: "Page not found" });
  }
};
// ------ REGISTER CONTROLLER ------ //
// ****** LOGIN CONTROLLER ****** //
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Register First😅" });
    }

    // todo: Method 1, Without Creating Separate compare function in the user-model.js file
    // const isPasswordValid = await bcrypt.compare(password, userExist.password);

    // todo: Method 2, Creating Separate compare function in the user-model.js file
    const isPasswordValid = await userExist.comparePassword(password);

    // if-else same for both method
    if (isPasswordValid) {
      res.status(200).json({
        msg: "Login Successful😄",
        token: userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(404).json({ msg: "Wrong Credentials 🚫" });
  }
};
// ------ LOGIN CONTROLLER ------ //

// ******  USER CONTROLLER - for fetching users data from the DB  ****** //
const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);

    res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};
// ------  USER CONTROLLER - for fetching users data from the DB  ------ //

export default { home, register, login, user };
