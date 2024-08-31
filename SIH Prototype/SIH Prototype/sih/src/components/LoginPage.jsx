// import axios from "axios";
// import React, { useState } from "react";
// import { FaFacebookF, FaGoogle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import "../components/LoginPage.css";

// const LoginSignup = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     termsAccepted: false,
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Handle field changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isLogin) {
//       if (validateLogin()) {
//         try {
//           const response = await axios.get(
//             `http://localhost:8080/api/users/${formData.username}`
//           );
//           const user = response.data;

//           if (!user) {
//             setError("User not found");
//           } else if (user.password === formData.password) {
//             sessionStorage.setItem("name", user.firstName); // Store the first name
//             navigate("/home");
//           } else {
//             setError("Incorrect password");
//           }
//         } catch (err) {
//           console.log("Login failed due to: " + err.message);
//           setError("Login failed due to server error");
//         }
//       }
//     } else {
//       if (validateSignup()) {
//         try {
//           const response = await axios.post(
//             "http://localhost:8080/api/users/register",
//             {
//               username: formData.email, // Assuming you use email as the username
//               password: formData.password,
//               firstName: formData.firstName,
//               lastName: formData.lastName,
//               phone: formData.phone,
//               email: formData.email,
//             }
//           );
//           console.log("Signup Successful!", response.data);

//           // Switch to the login section
//           setIsLogin(true);
//           setError(""); // Clear any previous errors
//         } catch (err) {
//           console.log("Signup failed due to: " + err.message);
//           setError("Signup failed due to server error");
//         }
//       }
//     }
//   };

//   // Validation for login
//   const validateLogin = () => {
//     let result = true;
//     if (!formData.username || !formData.password) {
//       setError("Please fill in all fields");
//       result = false;
//     }
//     return result;
//   };

//   // Validation for signup
//   const validateSignup = () => {
//     let result = true;
//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.phone ||
//       !formData.email ||
//       !formData.password
//     ) {
//       setError("Please fill in all fields");
//       result = false;
//     }
//     if (!formData.termsAccepted) {
//       setError("You must accept the terms and conditions");
//       result = false;
//     }
//     return result;
//   };

//   return (
//     <div className={`login-container ${isLogin ? "login-mode" : ""}`}>
//       <div className="left-panel"></div>
//       <div className="right-panel">
//         <div className="form">
//           <h1 className="title">Hello, Guyss!</h1>
//           <div className="button-group">
//             <button
//               className={`tab-button ${isLogin ? "active" : ""}`}
//               onClick={() => setIsLogin(true)}
//             >
//               Login
//             </button>
//             <button
//               className={`tab-button ${!isLogin ? "active" : ""}`}
//               onClick={() => setIsLogin(false)}
//             >
//               SignUp
//             </button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             {isLogin ? (
//               <>
//                 <input
//                   className="input"
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   placeholder="Enter Username"
//                 />
//                 <input
//                   className="input"
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter Password"
//                 />
//               </>
//             ) : (
//               <>
//                 <input
//                   className="input"
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   placeholder="First Name"
//                 />
//                 <input
//                   className="input"
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   placeholder="Last Name"
//                 />
//                 <input
//                   className="input"
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Phone Number"
//                 />
//                 <input
//                   className="input"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email"
//                 />
//                 <input
//                   className="input"
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Password"
//                 />
//                 <div className="terms">
//                   <input
//                     type="checkbox"
//                     name="termsAccepted"
//                     checked={formData.termsAccepted}
//                     onChange={handleChange}
//                   />
//                   <label htmlFor="termsAccepted">
//                     I accept the terms and conditions
//                   </label>
//                 </div>
//               </>
//             )}
//             {error && <div className="error">{error}</div>}
//             <button className="button" type="submit">
//               {isLogin ? "Login" : "Sign Up"}
//             </button>
//           </form>

//           {isLogin && (
//             <>
//               <div className="divider">or</div>
//               <div className="social-login">
//                 <div className="social-icons">
//                   <FaFacebookF />
//                 </div>
//                 <div className="social-icons">
//                   <FaGoogle />
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;

import axios from "axios";
import React, { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../components/LoginPage.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    termsAccepted: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      if (validateLogin()) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/users/${formData.username}`
          );
          const user = response.data;

          if (!user) {
            setError("User not found");
          } else if (user.password === formData.password) {
            sessionStorage.setItem("name", user.firstName); // Store the first name
            sessionStorage.setItem("email", user.email); // Store the email
            navigate("/home");
          } else {
            setError("Incorrect password");
          }
        } catch (err) {
          console.log("Login failed due to: " + err.message);
          setError("Login failed due to server error");
        }
      }
    } else {
      if (validateSignup()) {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/users/register",
            {
              username: formData.email, // Assuming you use email as the username
              password: formData.password,
              firstName: formData.firstName,
              lastName: formData.lastName,
              phone: formData.phone,
              email: formData.email,
            }
          );
          console.log("Signup Successful!", response.data);

          // Switch to the login section
          setIsLogin(true);
          setError(""); // Clear any previous errors
        } catch (err) {
          console.log("Signup failed due to: " + err.message);
          setError("Signup failed due to server error");
        }
      }
    }
  };

  // Validation for login
  const validateLogin = () => {
    let result = true;
    if (!formData.username || !formData.password) {
      setError("Please fill in all fields");
      result = false;
    }
    return result;
  };

  // Validation for signup
  const validateSignup = () => {
    let result = true;
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all fields");
      result = false;
    }
    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions");
      result = false;
    }
    return result;
  };

  return (
    <div className="main-login">

    <div className={`login-container ${isLogin ? "login-mode" : ""}`}>
      <div className="left-panel"></div>
      <div className="right-panel">
        <div className="form">
          <h1 className="title">Hello, Guyss!</h1>
          <div className="button-group">
            <button
              className={`tab-button ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`tab-button ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              SignUp
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {isLogin ? (
              <>
                <input
                  className="input"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter Username"
                />
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
              </>
            ) : (
              <>
                <input
                  className="input"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
                <input
                  className="input"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
                <input
                  className="input"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <div className="terms">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                  />
                  <label htmlFor="termsAccepted">
                    I accept the terms and conditions
                  </label>
                </div>
              </>
            )}
            {error && <div className="error">{error}</div>}
            <button className="button" type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {isLogin && (
            <>
              <div className="divider">or</div>
              <div className="social-login">
                <div className="social-icons">
                  <FaFacebookF />
                </div>
                <div className="social-icons">
                  <FaGoogle />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginSignup;
