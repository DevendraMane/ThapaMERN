import { useEffect, useState } from "react";

import { useAuth } from "../store/auth";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
  const { authorizationToken } = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const params = useParams();
  console.log("params of single user: ", params);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("updated data ➡️", user);
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        const res_data = await response.json();
        setUser((prev) => ({ ...prev, ...res_data }));
        toast.success("Updated Successfully ");
      } else {
        toast.error("Not Updated ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   getting single users data:

  const getSingleUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();
      setUser(data);
      console.log("Users data in Update page➡️", data);
    } catch (error) {
      console.log("error while updating the data:", error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-one-cols">
              <div className="registration-form">
                <h1 className="main-heading mb-3">Update User</h1>
                <br />
                <form onSubmit={handleFormSubmit}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your Username"
                      id="username"
                      required
                      autoComplete="off"
                      value={user.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Enter your phone"
                      id="phone"
                      required
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
