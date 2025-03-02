import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ***********REGISTRATION SCHEMA*************//

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
// -------------REGISTRATION SCHEMA------------//

//***********hash the password: using Method2(pre)*********//
// ?This works like a middleware for hashing the password before saving it to DB
userSchema.pre("save", async function (next) {
  const user = this;

  //   if already Modified:
  if (!user.isModified("password")) {
    next(); //this next() tell to go to the next step(i.e here store it to DB)
  }

  //   And if it is not Modified:(try-catch)
  try {
    // const saltRound = 10;
    const saltRound = await bcrypt.genSalt(10);

    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
  console.log("data from pre:", this);
});
//----------hash the password: using Method2(pre)-----------//

// ******  JWT Token for new User  ****** //
// generateToken is also known as instace method in which you can creat as many function as you want
// todo: Learn about this more
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userID: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.log(error);
  }
};
// ------  JWT Token for new User  ------ //

// ******  JWT Token for comparing Password while Login of existing User  ****** //
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
// ------  JWT Token for comparing Password while Login of existing User  ------ //

//********define the model or the collection name*************//
const User = new mongoose.model("User", userSchema);
// const User = new mongoose.model("Collection_Name", userSchema);
//? Here the collection name must start with Capital letter and it has to be singular(mongoDB will automatically convert it to plural)

export default User;
//----------define the model or the collection name------------//

// ????????????????????  Info about JWT  ?????????????????????//
// **What is JWT?**
//JSON web Tokens (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
//?JWTs are often used for authentication and authorization in web applications.
//?1. Authentication: Verifying the identity of a user or client.
//?2. Authorization: Determining what actions a user or client is allowed to perform.

// Components of a JWT:**
//? Header: Contains metadata about the token, such as the type of token and the signing algorithm being used.
//? Paysad: Contains claims or statements about an entity (typically, the user) and additional data. Common claims include user 10, username, and expiration time.
//? Signature: fo verify that the sender of the JMT is who it says it is and to ensure that the message wasir't changed along the way, signature is included.

// ?Tokens, such as JWTs (JSON Web Tokens), are typically not stored in the database along with other user details. Instead, they are issued by the server during the authentication process and then stored on the client-side (e.g., in cookies or local storage) for later use.
// --------------  Info about JWT  --------------------//
