import mongoose from "mongoose";

// ***********REGISTRATION SCHEMA*************//

const contactSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
// -------------REGISTRATION SCHEMA------------//

//********define the model or the collection name*************//
const Contact = new mongoose.model("Contact", contactSchema);
// const Contact = new mongoose.model("Collection_Name", contactSchema);
//? Here the collection name must start with Capital letter and it has to be singular(mongoDB will automatically convert it to plural)

export default Contact;
//----------define the model or the collection name------------//
