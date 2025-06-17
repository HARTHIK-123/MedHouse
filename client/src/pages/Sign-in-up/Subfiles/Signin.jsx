import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../signInUp.css";
import backendURL from "../../../config";

function Signin({ setSignin, setLoginState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function signInUser(e) {
    e.preventDefault();
    fetch(`${backendURL}/api/v1/user/signin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log(data)
          localStorage.setItem("studentId", data.user._id)
          navigate("/home");
          Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "You have been logged in.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Entered credentials are not correct!",
          });
        }
        console.log(data.status);
      })
      .catch((err) => {
        console.log("rejected", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Network error. Please try again later.",
        });
      });
  }

  return (
    <div className="sign-main-container">
      <h1> Student Sign in</h1>
      <form onSubmit={signInUser}>
        <div className="sign-in-email">
          <label htmlFor="sign-in-email">Email</label>
          <input
            type="email"
            name="sign-in-email"
            id="sign-in-email"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="sign-in-password">
          <label htmlFor="sign-in-password">Password</label>
          <input
            type="password"
            name="sign-in-password"
            id="sign-in-password"
            placeholder="password..."
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
      {/* <p>
        Don't have an account?{" "}
        <span onClick={() => setSignin(() => "signup")}>Sign up</span>
      </p> */}
      <p>
        Are you an admin?{" "}
        <span onClick={() => navigate("/admin/signin")}>Go to Admin Signin</span>
      </p>
    </div>
  );
}

export default Signin;
