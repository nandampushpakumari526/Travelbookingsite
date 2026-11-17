
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark travel-navbar">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          TravelGo
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#travelNavbar"
          aria-controls="travelNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="travelNavbar">
          <div className="navbar-nav ms-auto align-items-lg-center">

            <NavLink className="nav-link" to="/">
              Home
            </NavLink>

            {isLoggedIn ? (
              <>
                <NavLink className="nav-link" to="/trip-investment">
                  Trip Investment
                </NavLink>

                <NavLink className="nav-link" to="/flight-booking">
                  Flight Booking
                </NavLink>

                <NavLink className="nav-link" to="/bus-booking">
                  Bus Booking
                </NavLink>

                <NavLink className="nav-link" to="/my-bookings">
                  My Bookings
                </NavLink>

                <button
                  className="btn btn-warning ms-lg-2"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-warning ms-lg-2">
                Login
              </Link>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
