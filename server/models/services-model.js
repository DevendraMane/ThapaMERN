import mongoose from "mongoose";

// ***********SERVICES SCHEMA*************//

const servicesSchema = new mongoose.Schema({
  service: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  provider: {
    type: String,
    require: true,
  },
});
// -------------SERVICES SCHEMA------------//

//********define the model or the collection name*************//
const Service = new mongoose.model("Service", servicesSchema);
// const Contact = new mongoose.model("Collection_Name", contactSchema);
//? Here the collection name must start with Capital letter and it has to be singular(mongoDB will automatically convert it to plural)

export default Service;
//----------define the model or the collection name------------//
