import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth.jsx";
import { toast } from "react-toastify";

export const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenToLocalStrorage, API } = useAuth();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(user);
    // *or from here you can send data to the DB

    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("signUp Response❔:", response);

      const res_data = await response.json();
      console.log("response from server", res_data.message);

      //? for cleaning the form after successfully posting the data
      if (response.ok) {
        // ***** FOR STORING TOKEN TO LOCAL STORAGE ***** //

        // ?function for storing data to local storage
        storeTokenToLocalStrorage(res_data.token);
        // ----- FOR STORING TOKEN TO LOCAL STORAGE ----- //

        // ? WHY WE ARE MAKING SEPERATE FUNCTION FOR STORING TOKENS ? //
        // !We can store token like this also,
        // localStorage.setItem("token:", res_data.token);
        // but we have to do it for every page were token is needed, hence we will use useContext hook
        // ? WHY WE ARE MAKING SEPERATE FUNCTION FOR STORING TOKENS ? //

        toast(`registerd successfully ✅`);

        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
      } else {
        // ?we are getting these errors from the error-middleware.js of server(Zod)
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );

        // alert("not valid registration");
      }
    } catch (error) {
      console.log(error);
    }
    // ?for Navigating the user to the page that you want
    navigate("/");
  };

  const handleInputChange = (e) => {
    // *the name here is the name attribute in the input field of jsx
    const { name, value } = e.target;

    // todo: this will give the previous values...
    // setUser((kuchBhi) => console.log(kuchBhi));

    // setUser((prev) => ({ ...prev, name: value })); //todo: see why we can't use user as it is without the [brackets]
    // *by applying [brackets] we are making it dynamic
    // *the brackets let React dynamically update the specific field in the user object based on the input's name attribute.
    // !See the example at the end of this code for better understanding
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/register.png"
                  alt="register-img"
                  width="400"
                  height="500"
                />
              </div>

              {/* Registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
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
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
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
