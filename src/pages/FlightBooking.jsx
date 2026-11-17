
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateFlights } from "../data/flightGenerator";
import "./FlightBooking.css";

function FlightBooking() {
  const navigate = useNavigate();

  const [search, setSearch] = useState({
    from: "",
    to: "",
    date: "",
    travelers: 1
  });

  const [flights, setFlights] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const [passenger, setPassenger] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  function handleSearchChange(e) {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    });
  }

  function handlePassengerChange(e) {
    setPassenger({
      ...passenger,
      [e.target.name]: e.target.value
    });
  }

  function searchFlights(e) {
    e.preventDefault();

    if (search.from.trim().toLowerCase() === search.to.trim().toLowerCase()) {
      setError("Departure and destination cannot be the same.");
      return;
    }

    if (search.date < today) {
      setError("Please select today or a future date.");
      return;
    }

    if (Number(search.travelers) < 1 || Number(search.travelers) > 9) {
      setError("Please select between 1 and 9 travelers.");
      return;
    }

    setError("");
    setSelectedFlight(null);
    setSearched(true);
    setFlights(generateFlights(search.from.trim(), search.to.trim()));
  }

  function bookFlight(e) {
    e.preventDefault();

    if (!selectedFlight) {
      setError("Please select a flight.");
      return;
    }

    if (!passenger.name.trim() || !passenger.email.trim() || !passenger.phone.trim()) {
      setError("Please enter all passenger details.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(passenger.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    const booking = {
      bookingId: "FL" + Date.now(),
      type: "Flight",
      route: `${search.from} to ${search.to}`,
      date: search.date,
      travelers: Number(search.travelers),
      passenger: { ...passenger },
      service: selectedFlight.airline,
      timing: `${selectedFlight.departure} - ${selectedFlight.arrival}`,
      amount: selectedFlight.price * Number(search.travelers),
      status: "Booked",
      bookingDate: new Date().toLocaleString()
    };

    try {
      const oldBookings = JSON.parse(
        localStorage.getItem("travelgoBookings") || "[]"
      );

      localStorage.setItem(
        "travelgoBookings",
        JSON.stringify([...oldBookings, booking])
      );

      window.dispatchEvent(new Event("travelgoBookingsUpdated"));
      navigate("/my-bookings");
    } catch (err) {
      setError("Unable to save your booking. Please try again.");
    }
  }

  return (
    <div className="tg-flight-page">

      {/* Hero Section */}
      <section className="tg-flight-hero">
        <div className="tg-hero-overlay"></div>

        <div className="container tg-hero-content">
          <span className="tg-hero-label">
            <span></span> YOUR JOURNEY STARTS HERE
          </span>

          <h1>
            The world is waiting.
            <br />
            <span>Let's fly there.</span>
          </h1>

          <p>
            Discover new destinations and enjoy a comfortable journey
            with TravelGo.
          </p>

          <div className="tg-hero-features">
            <span>✈ Easy Booking</span>
            <span>✓ Simple Reservations</span>
            <span>◷ Flexible Travel</span>
          </div>
        </div>

        <div className="tg-hero-bottom"></div>
      </section>

      <div className="container tg-flight-container">

        {/* Flight Search */}
        <section className="tg-search-panel">
          <div className="tg-search-heading">
            <div>
              <span className="tg-eyebrow">PLAN YOUR TRIP</span>
              <h2>Find your perfect flight</h2>
              <p>Choose your route and discover available flights.</p>
            </div>

            <div className="tg-search-plane">✈</div>
          </div>

          <form onSubmit={searchFlights}>
            <div className="row g-3">

              <div className="col-lg-3 col-md-6">
                <label className="tg-label">FROM</label>
                <div className="tg-input-wrapper">
                  <span>⌖</span>
                  <input
                    type="text"
                    name="from"
                    placeholder="Departure city"
                    value={search.from}
                    onChange={handleSearchChange}
                    required
                  />
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <label className="tg-label">TO</label>
                <div className="tg-input-wrapper">
                  <span>⌖</span>
                  <input
                    type="text"
                    name="to"
                    placeholder="Destination city"
                    value={search.to}
                    onChange={handleSearchChange}
                    required
                  />
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <label className="tg-label">DEPARTURE DATE</label>
                <div className="tg-input-wrapper">
                  <span>▣</span>
                  <input
                    type="date"
                    name="date"
                    min={today}
                    value={search.date}
                    onChange={handleSearchChange}
                    required
                  />
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <label className="tg-label">TRAVELERS</label>
                <div className="tg-input-wrapper">
                  <span>♙</span>
                  <input
                    type="number"
                    name="travelers"
                    min="1"
                    max="9"
                    value={search.travelers}
                    onChange={handleSearchChange}
                    required
                  />
                </div>
              </div>

            </div>

            <button type="submit" className="tg-search-button">
              <span>✈</span> Search Flights
            </button>
          </form>
        </section>

        {error && (
          <div className="tg-error-message">
            <span>!</span> {error}
          </div>
        )}

        {/* Search Results */}
        {searched && (
          <section className="tg-results-section">

            <div className="tg-results-heading">
              <div>
                <span className="tg-eyebrow">YOUR OPTIONS</span>
                <h2>Available flights</h2>
                <p>
                  {search.from} <span>→</span> {search.to}
                </p>
              </div>

              <div className="tg-results-count">
                {flights.length} {flights.length === 1 ? "FLIGHT" : "FLIGHTS"}
              </div>
            </div>

            {flights.length > 0 ? (
              flights.map((flight) => (
                <div
                  className={`tg-flight-ticket ${
                    selectedFlight?.id === flight.id ? "tg-ticket-selected" : ""
                  }`}
                  key={flight.id}
                >
                  <div className="tg-ticket-main">

                    <div className="tg-airline">
                      <div className="tg-airline-logo">✈</div>
                      <div>
                        <h4>{flight.airline}</h4>
                        <span>{flight.duration}</span>
                      </div>
                    </div>

                    <div className="tg-route-info">
                      <div className="tg-route-point">
                        <h3>{flight.departure}</h3>
                        <span>{flight.from}</span>
                      </div>

                      <div className="tg-route-middle">
                        <span>{flight.duration}</span>
                        <div className="tg-route-line">
                          <i></i>
                          <span>✈</span>
                          <i></i>
                        </div>
                        <small>Direct Flight</small>
                      </div>

                      <div className="tg-route-point">
                        <h3>{flight.arrival}</h3>
                        <span>{flight.to}</span>
                      </div>
                    </div>

                    <div className="tg-ticket-price">
                      <span>PRICE / PERSON</span>
                      <h3>₹{flight.price.toLocaleString("en-IN")}</h3>

                      <button
                        type="button"
                        className={
                          selectedFlight?.id === flight.id
                            ? "tg-selected-button"
                            : "tg-select-button"
                        }
                        onClick={() => {
                          setSelectedFlight(flight);
                          setError("");
                        }}
                      >
                        {selectedFlight?.id === flight.id
                          ? "✓ Selected"
                          : "Select Flight"}
                      </button>
                    </div>

                  </div>

                  {selectedFlight?.id === flight.id && (
                    <div className="tg-selected-note">
                      <span>✓</span> This flight is selected for your booking.
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="tg-no-flights">
                <div>✈</div>
                <h3>No flights found</h3>
                <p>
                  We couldn't find flights for this route. Try different
                  departure or destination cities.
                </p>
              </div>
            )}

          </section>
        )}

        {/* Passenger Details */}
        {selectedFlight && (
          <section className="tg-passenger-section">

            <div className="tg-passenger-heading">
              <span className="tg-eyebrow">FINAL STEP</span>
              <h2>Complete your booking</h2>
              <p>Enter your passenger information to confirm your journey.</p>
            </div>

            <div className="tg-booking-summary">
              <div className="tg-summary-route">
                <div>
                  <span>DEPARTURE</span>
                  <h3>{selectedFlight.from}</h3>
                  <p>{selectedFlight.departure}</p>
                </div>

                <div className="tg-summary-plane">✈</div>

                <div>
                  <span>ARRIVAL</span>
                  <h3>{selectedFlight.to}</h3>
                  <p>{selectedFlight.arrival}</p>
                </div>
              </div>

              <div className="tg-summary-details">
                <div>
                  <span>Airline</span>
                  <strong>{selectedFlight.airline}</strong>
                </div>

                <div>
                  <span>Travel date</span>
                  <strong>{search.date}</strong>
                </div>

                <div>
                  <span>Travelers</span>
                  <strong>{search.travelers} Person(s)</strong>
                </div>

                <div className="tg-total-price">
                  <span>Total amount</span>
                  <strong>
                    ₹{(
                      selectedFlight.price * Number(search.travelers)
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>
            </div>

            <form className="tg-passenger-form" onSubmit={bookFlight}>
              <h3>Passenger information</h3>

              <div className="row g-4">

                <div className="col-md-4">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter passenger name"
                    value={passenger.name}
                    onChange={handlePassengerChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={passenger.email}
                    onChange={handlePassengerChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="10-digit phone number"
                    maxLength="10"
                    value={passenger.phone}
                    onChange={handlePassengerChange}
                    required
                  />
                </div>

              </div>

              <div className="tg-confirm-area">
                <div>
                  <span>YOUR TOTAL</span>
                  <h3>
                    ₹{(
                      selectedFlight.price * Number(search.travelers)
                    ).toLocaleString("en-IN")}
                  </h3>
                </div>

                <button type="submit" className="tg-confirm-button">
                  Confirm Booking <span>→</span>
                </button>
              </div>
            </form>

          </section>
        )}

        {/* Bottom Information */}
        <section className="tg-bottom-info">
          <div>
            <span>✈</span>
            <div>
              <h4>Easy Flight Booking</h4>
              <p>Find your preferred flight with ease.</p>
            </div>
          </div>

          <div>
            <span>✓</span>
            <div>
              <h4>Simple Reservations</h4>
              <p>Manage your bookings in one place.</p>
            </div>
          </div>

          <div>
            <span>♡</span>
            <div>
              <h4>Travel with Confidence</h4>
              <p>Plan your next journey with TravelGo.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default FlightBooking;
