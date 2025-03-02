import Service from "../models/services-model.js";
// ****** SERVICES CONTROLLER ****** //
export const services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(404).json({ msg: "No Service Found ❌" });
    }

    res.status(200).json({ response });
  } catch (error) {
    console.log(`services:${error}`);
  }
};
// ------ SERVICES CONTROLLER ------ //
