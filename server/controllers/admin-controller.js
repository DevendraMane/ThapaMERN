import User from "../models/user-model.js";
import Contact from "../models/contact-model.js";
// ****** USER-DATA CONTROLLER ****** //
const usersData = async (req, res) => {
  try {
    const users = await User.find().select({ password: 0 });
    console.log("All Users Data➡️ ", users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
// ------ USER-DATA CONTROLLER ------ //

// ****** USER-CONTACT CONTROLLER ****** //
const contactsData = async (req, res) => {
  try {
    const contacts = await Contact.find().select({ password: 0 });
    console.log("Contacts Data➡️ ", contacts);
    if (!contacts || contacts.length === 0) {
      res.status(404).json({ message: "No Contacts Found" });
    }
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
// ------ USER-CONTACT CONTROLLER ------ //

// ****** USER-CONTACT CONTROLLER ****** //
const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    res.status(200).json({ message: "Contacts Data Deleted Successfully🗑️ " });
  } catch (error) {
    next(error);
  }
};
// ------ USER-CONTACT CONTROLLER ------ //

// ****** USER-DELETE CONTROLLER ****** //
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
// ------ USER-DELETE CONTROLLER ------ //

// ****** USER-DELETE CONTROLLER ****** //
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
// ------ USER-DELETE CONTROLLER ------ //

// ****** USER-UPDATE CONTROLLER ****** //
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      {
        $set: updatedUserData,
      }
    );
    res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};
// ------ USER-UPDATE CONTROLLER ------ //

export default {
  usersData,
  contactsData,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
};
