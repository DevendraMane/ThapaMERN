// ****** CONTACT CONTROLLER ****** //
import Contact from "../models/contact-model.js";
const contact = async (req, res) => {
  try {
    const respose = req.body;
    await Contact.create(respose);
    return res.status(200).json({ message: "Message Sent Successfully😄" });
  } catch (error) {
    next(error);
  }
};
// ------ CONTACT CONTROLLER ------ //

export default { contact };
