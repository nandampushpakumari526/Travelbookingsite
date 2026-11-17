
import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const users = JSON.parse(
    localStorage.getItem("travelgoUsers") || "[]"
  );

  const user = users[users.length - 1];

  if (!user) {
    return <div className="container mt-5">No profile found.</div>;
  }

  return (
    <div className="container d-flex justify-content-center">
      <div className="card shadow p-4 my-5" style={{ width: "450px" }}>

        <div className="text-center">
          <div
            className="rounded-circle bg-primary text-white d-inline-flex justify-content-center align-items-center"
            style={{ width: "85px", height: "85px", fontSize: "35px" }}
          >
            {user.firstName.charAt(0).toUpperCase()}
          </div>

          <h3 className="mt-3">
            {user.firstName} {user.lastName}
          </h3>

          <p className="text-success">Registration Completed</p>
        </div>

        <hr />

        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Date of Birth:</strong> {user.dob}</p>
        <p><strong>Gender:</strong> {user.gender}</p>

        <button
          className="btn btn-warning w-100 mt-3"
          onClick={() => navigate("/login")}
        >
          Continue to Login
        </button>

      </div>
    </div>
  );
}

export default Profile;
