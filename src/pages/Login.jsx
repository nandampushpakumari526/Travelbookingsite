
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    const users = JSON.parse(
      localStorage.getItem("travelgoUsers") || "[]"
    );

    const registeredUser = users.find(
      user => user.email === email
    );

    if (!registeredUser) {
      setEmailError("Email is not registered. Please register first.");
      return;
    }

    if (registeredUser.password !== password) {
      setPasswordError("Incorrect password. Please try again.");
      return;
    }

    onLogin();
    navigate("/");
  }

  return (
    <div className="container d-flex justify-content-center">
      <div className="card shadow p-4 my-5" style={{ width: "430px" }}>

        <h2 className="text-center mb-4">Welcome Back!</h2>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className={`form-control ${emailError ? "is-invalid" : ""}`}
              placeholder="Email Address"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              required
            />

            {emailError && (
              <small className="text-danger">
                {emailError}
              </small>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              placeholder="Password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              required
            />

            {passwordError && (
              <small className="text-danger">
                {passwordError}
              </small>
            )}
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Login
          </button>

        </form>

        <hr />

        <p className="text-center mb-0">
          Don't have an account?
        </p>

        <Link
          to="/register"
          className="btn btn-outline-primary w-100 mt-2"
        >
          Register
        </Link>

      </div>
    </div>
  );
}

export default Login;
