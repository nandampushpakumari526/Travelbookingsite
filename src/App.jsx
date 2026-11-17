
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import FlightBooking from "./pages/FlightBooking";
import BusBooking from "./pages/BusBooking";
import TripInvestment from "./pages/TripInvestment";
import MyBookings from "./pages/MyBookings";

function AppContent() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("travelgoLoggedIn") === "true"
  );

  // Login Function
  const handleLogin = () => {
    localStorage.setItem("travelgoLoggedIn", "true");
    setIsLoggedIn(true);
  };

  // Logout Function
 const handleLogout = () => {
  // Remove login session
  localStorage.removeItem("travelgoLoggedIn");

  // Delete all registered user details
  localStorage.removeItem("travelgoUsers");

  // Update login state
  setIsLoggedIn(false);

  // Redirect to Home
  window.location.href = "/";
};
  return (
    <>
      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={<Home isLoggedIn={isLoggedIn} />}
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Register Page */}
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Register />
            )
          }
        />

        {/* User Profile Page */}
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Profile />
            )
          }
        />

        {/* Protected Pages */}
        <Route element={<ProtectedRoutes />}>

          <Route
            path="/flight-booking"
            element={<FlightBooking />}
          />

          <Route
            path="/bus-booking"
            element={<BusBooking />}
          />

          <Route
            path="/trip-investment"
            element={<TripInvestment />}
          />

          <Route
            path="/my-bookings"
            element={<MyBookings />}
          />

        </Route>

        {/* Invalid URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
