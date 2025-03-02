import { useEffect, useState } from "react";

import { useAuth } from "../store/auth";
import { Link } from "react-router";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();
  const getAllUsersData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("users data for Admin:", data);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsersData();
  }, []);

  // deleteUsers function
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = response.json();
      console.log("users after delete: ", data);

      // ?for getting refreshed users data after deleting one(without we manually have to refresh the page)
      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };
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
                  <th>Phone</th>
                  <th>Updata</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((currElem, index) => {
                  return (
                    <tr key={index}>
                      <td>{currElem.username}</td>
                      <td>{currElem.email}</td>
                      <td>{currElem.phone}</td>
                      <td>
                        <Link to={`/admin/users/update/${currElem._id}`}>
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteUser(currElem._id)}
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
