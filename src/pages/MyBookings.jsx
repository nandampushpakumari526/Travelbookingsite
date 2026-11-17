
import React, { useEffect, useState } from "react";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  function loadBookings() {
    try {
      const saved = JSON.parse(
        localStorage.getItem("travelgoBookings") || "[]"
      );
      setBookings(Array.isArray(saved) ? saved : []);
    } catch {
      setBookings([]);
    }
  }

  useEffect(() => {
    loadBookings();

    window.addEventListener("travelgoBookingsUpdated", loadBookings);
    window.addEventListener("storage", loadBookings);

    return () => {
      window.removeEventListener("travelgoBookingsUpdated", loadBookings);
      window.removeEventListener("storage", loadBookings);
    };
  }, []);

  function cancelBooking(id) {
    const updated = bookings.map((booking) =>
      booking.bookingId === id
        ? { ...booking, status: "Cancelled" }
        : booking
    );

    localStorage.setItem("travelgoBookings", JSON.stringify(updated));
    setBookings(updated);
    window.dispatchEvent(new Event("travelgoBookingsUpdated"));
  }

  function deleteBooking(id) {
    const updated = bookings.filter(
      (booking) => booking.bookingId !== id
    );

    localStorage.setItem("travelgoBookings", JSON.stringify(updated));
    setBookings(updated);
    window.dispatchEvent(new Event("travelgoBookingsUpdated"));
  }

  const flightCount = bookings.filter(
    (b) => b.type === "Flight"
  ).length;

  const busCount = bookings.filter(
    (b) => b.type === "Bus"
  ).length;

  const activeCount = bookings.filter(
    (b) => b.status === "Booked"
  ).length;

  return (
    <div className="my-bookings-page">

      {/* Header */}
      <section className="booking-header">
        <div className="booking-header-content">
          <span className="booking-eyebrow">TRAVELGO DASHBOARD</span>
          <h1>My Bookings</h1>
          <p>Manage your journeys and keep all your travel plans in one place.</p>
        </div>
      </section>

      <div className="booking-container">

        {/* Summary Cards */}
        <div className="booking-stats">

          <div className="booking-stat-card">
            <div className="stat-icon total-icon">✈</div>
            <div>
              <p>Total Bookings</p>
              <h2>{bookings.length}</h2>
            </div>
          </div>

          <div className="booking-stat-card">
            <div className="stat-icon flight-icon">🛫</div>
            <div>
              <p>Flight Bookings</p>
              <h2>{flightCount}</h2>
            </div>
          </div>

          <div className="booking-stat-card">
            <div className="stat-icon bus-icon">🚌</div>
            <div>
              <p>Bus Bookings</p>
              <h2>{busCount}</h2>
            </div>
          </div>

          <div className="booking-stat-card">
            <div className="stat-icon active-icon">✓</div>
            <div>
              <p>Active Bookings</p>
              <h2>{activeCount}</h2>
            </div>
          </div>

        </div>

        {/* Booking List Heading */}
        <div className="booking-list-heading">
          <div>
            <h2>Your Travel History</h2>
            <p>View and manage your booked journeys</p>
          </div>
          <span className="booking-total-label">
            {bookings.length} {bookings.length === 1 ? "Booking" : "Bookings"}
          </span>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="empty-bookings">
            <div className="empty-booking-icon">✈️</div>
            <h3>No Bookings Yet!</h3>
            <p>
              Your next adventure is waiting. Book a flight or bus
              to see your travel details here.
            </p>
          </div>
        ) : (

          <div className="booking-list">

            {bookings.map((booking) => (

              <div
                className="modern-booking-card"
                key={booking.bookingId}
              >

                {/* Card Top */}
                <div className="booking-card-top">

                  <div className="booking-service">
                    <div className={`service-icon ${
                      booking.type === "Flight"
                        ? "flight-service"
                        : "bus-service"
                    }`}>
                      {booking.type === "Flight" ? "✈" : "🚌"}
                    </div>

                    <div>
                      <span className="booking-type">
                        {booking.type} Booking
                      </span>
                      <h3>{booking.route}</h3>
                      <p>{booking.service}</p>
                    </div>
                  </div>

                  <span className={`booking-status ${
                    booking.status === "Booked"
                      ? "status-booked"
                      : "status-cancelled"
                  }`}>
                    {booking.status}
                  </span>

                </div>

                <div className="booking-divider"></div>

                {/* Journey Details */}
                <div className="booking-details-grid">

                  <div className="booking-detail">
                    <span>BOOKING ID</span>
                    <strong>{booking.bookingId}</strong>
                  </div>

                  <div className="booking-detail">
                    <span>JOURNEY DATE</span>
                    <strong>{booking.date}</strong>
                  </div>

                  <div className="booking-detail">
                    <span>DEPARTURE / ARRIVAL</span>
                    <strong>{booking.timing}</strong>
                  </div>

                  <div className="booking-detail">
                    <span>PASSENGERS</span>
                    <strong>{booking.travelers}</strong>
                  </div>

                </div>

                <div className="booking-divider"></div>

                {/* Passenger Details */}
                <div className="passenger-section">
                  <h4>Passenger Information</h4>

                  <div className="passenger-details-grid">
                    <div>
                      <span>Name</span>
                      <strong>{booking.passenger?.name || "N/A"}</strong>
                    </div>

                    <div>
                      <span>Email</span>
                      <strong>{booking.passenger?.email || "N/A"}</strong>
                    </div>

                    <div>
                      <span>Phone</span>
                      <strong>{booking.passenger?.phone || "N/A"}</strong>
                    </div>

                    <div>
                      <span>Booking Date</span>
                      <strong>{booking.bookingDate || "N/A"}</strong>
                    </div>
                  </div>
                </div>

                <div className="booking-divider"></div>

                {/* Bottom Section */}
                <div className="booking-card-bottom">

                  <div className="booking-amount">
                    <span>Total Amount</span>
                    <h2>
                      ₹{Number(booking.amount || 0).toLocaleString("en-IN")}
                    </h2>
                  </div>

                  <div className="booking-actions">

                    {booking.status === "Booked" && (
                      <button
                        className="cancel-booking-btn"
                        onClick={() => {
                          if (window.confirm("Cancel this booking?")) {
                            cancelBooking(booking.bookingId);
                          }
                        }}
                      >
                        Cancel Booking
                      </button>
                    )}

                    <button
                      className="delete-booking-btn"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Delete this booking permanently?"
                          )
                        ) {
                          deleteBooking(booking.bookingId);
                        }
                      }}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyBookings;
