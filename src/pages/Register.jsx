
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleRegister(e) {
    e.preventDefault();

    let newErrors = {};

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Password does not match";
    }

    const users = JSON.parse(
      localStorage.getItem("travelgoUsers") || "[]"
    );

    if (
      users.some(
        user => user.email === form.email.trim().toLowerCase()
      )
    ) {
      newErrors.email = "Email already exists";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newUser = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email.trim().toLowerCase(),
      phone: form.phone,
      dob: form.dob,
      gender: form.gender,
      password: form.password
    };

    users.push(newUser);

    localStorage.setItem(
      "travelgoUsers",
      JSON.stringify(users)
    );

    // Open the profile page after registration
    navigate("/profile");
  }

  return (
    <div className="container d-flex justify-content-center">
      <div className="card shadow p-4 my-5" style={{ width: "500px" }}>

        <h2 className="text-center mb-4">Create Your Account</h2>

        <form onSubmit={handleRegister}>

          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div className="mb-3">
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="date"
              name="dob"
              className="form-control"
              value={form.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <select
              name="gender"
              className="form-select"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <small className="text-danger">
                {errors.confirmPassword}
              </small>
            )}
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Create Account
          </button>

        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
