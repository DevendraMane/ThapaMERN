import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router";

export const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const { authorizationToken } = useAuth();

  // function for getting all contact data
  const getAllContacts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const contactsData = await response.json();
        setContacts(contactsData);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // function for deleting the contacts by id
  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.ok) {
        getAllContacts();
        toast.success("Deleted Successfully 🗑️");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <>
      <section className="admin-users-section">
        <div className="admin-users-container ">
          <h1>Admin Users Data</h1>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((currElem, index) => {
                  return (
                    <tr key={index}>
                      <td>{currElem.username}</td>
                      <td>{currElem.email}</td>
                      <td>{currElem.message}</td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteContact(currElem._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};
