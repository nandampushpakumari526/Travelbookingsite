
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateBuses } from "../data/busGenerator";
import "./BusBooking.css";

function BusBooking() {
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [search, setSearch] = useState({
    from: "",
    to: "",
    date: "",
    seats: 1
  });

  const [buses, setBuses] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  const [passenger, setPassenger] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [error, setError] = useState("");

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

  function searchBuses(e) {
    e.preventDefault();

    if (search.from.trim().toLowerCase() === search.to.trim().toLowerCase()) {
      setError("Boarding and destination cities cannot be the same.");
      return;
    }

    if (search.date < today) {
      setError("Please select today or a future date.");
      return;
    }

    if (Number(search.seats) < 1 || Number(search.seats) > 6) {
      setError("Please select between 1 and 6 seats.");
      return;
    }

    setError("");
    setSelectedBus(null);
    setSearched(true);
    setBuses(generateBuses(search.from.trim(), search.to.trim()));
  }

  function bookBus(e) {
    e.preventDefault();

    if (!selectedBus) {
      setError("Please select a bus.");
      return;
    }

    if (
      !passenger.name.trim() ||
      !passenger.email.trim() ||
      !passenger.phone.trim()
    ) {
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
      bookingId: "BS" + Date.now(),
      type: "Bus",
      route: `${search.from} to ${search.to}`,
      date: search.date,
      travelers: Number(search.seats),
      passenger: { ...passenger },
      service: `${selectedBus.operator} (${selectedBus.type})`,
      timing: `${selectedBus.departure} - ${selectedBus.arrival}`,
      amount: selectedBus.price * Number(search.seats),
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
    <div className="tg-bus-page">

      {/* Hero Section */}
      <section className="tg-bus-hero">
        <div className="tg-bus-overlay"></div>

        <div className="container tg-bus-hero-content">
          <span className="tg-bus-hero-label">
            <span></span> EXPLORE MORE, TRAVEL BETTER
          </span>

          <h1>
            Every road leads
            <br />
            <span>to a new adventure.</span>
          </h1>

          <p>
            Discover comfortable bus journeys and explore your favorite
            destinations with TravelGo.
          </p>

          <div className="tg-bus-hero-features">
            <span>▣ Easy Booking</span>
            <span>✓ Simple Reservations</span>
            <span>♧ Comfortable Journeys</span>
          </div>
        </div>
      </section>

      <div className="container tg-bus-container">

        {/* Search Section */}
        <section className="tg-bus-search">
          <div className="tg-bus-search-heading">
            <div>
              <span className="tg-bus-eyebrow">PLAN YOUR JOURNEY</span>
              <h2>Find your bus</h2>
              <p>Choose your route and discover available buses.</p>
            </div>

            <div className="tg-bus-search-icon">🚌</div>
          </div>

          <form onSubmit={searchBuses}>
            <div className="row g-3">

              <div className="col-lg-3 col-md-6">
                <label className="tg-bus-label">FROM</label>
                <div className="tg-bus-input">
                  <span>⌖</span>
                  <input
                    type="text"
                    name="from"
                    placeholder="Boarding city"
                    value={search.from}
                    onChange={handleSearchChange}
                    required
                  />
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <label className="tg-bus-label">TO</label>
                <div className="tg-bus-input">
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
                <label className="tg-bus-label">JOURNEY DATE</label>
                <div className="tg-bus-input">
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
                <label className="tg-bus-label">SEATS</label>
                <div className="tg-bus-input">
                  <span>♙</span>
                  <input
                    type="number"
                    name="seats"
                    min="1"
                    max="6"
                    value={search.seats}
                    onChange={handleSearchChange}
                    required
                  />
                </div>
              </div>

            </div>

            <button type="submit" className="tg-bus-search-button">
              🚌 Search Buses
            </button>
          </form>
        </section>

        {error && (
          <div className="tg-bus-error">
            <span>!</span> {error}
          </div>
        )}

        {/* Available Buses */}
        {searched && (
          <section className="tg-bus-results">

            <div className="tg-bus-results-heading">
              <div>
                <span className="tg-bus-eyebrow">YOUR TRAVEL OPTIONS</span>
                <h2>Available buses</h2>
                <p>
                  {search.from} <span>→</span> {search.to}
                </p>
              </div>

              <div className="tg-bus-count">
                {buses.length} {buses.length === 1 ? "BUS" : "BUSES"}
              </div>
            </div>

            {buses.length > 0 ? (
              buses.map((bus) => (
                <div
                  className={`tg-bus-ticket ${
                    selectedBus?.id === bus.id ? "tg-bus-selected" : ""
                  }`}
                  key={bus.id}
                >
                  <div className="tg-bus-ticket-main">

                    {/* Operator */}
                    <div className="tg-bus-operator">
                      <div className="tg-bus-operator-icon">🚌</div>
                      <div>
                        <h4>{bus.operator}</h4>
                        <span>{bus.type}</span>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="tg-bus-route">

                      <div className="tg-bus-route-point">
                        <h3>{bus.departure}</h3>
                        <span>{bus.from}</span>
                      </div>

                      <div className="tg-bus-route-middle">
                        <span>{bus.duration}</span>
                        <div className="tg-bus-route-line">
                          <i></i>
                          <span>🚌</span>
                          <i></i>
                        </div>
                        <small>Bus Journey</small>
                      </div>

                      <div className="tg-bus-route-point">
                        <h3>{bus.arrival}</h3>
                        <span>{bus.to}</span>
                      </div>

                    </div>

                    {/* Price */}
                    <div className="tg-bus-price">
                      <span>PRICE / SEAT</span>
                      <h3>
                        ₹{bus.price.toLocaleString("en-IN")}
                      </h3>

                      <button
                        type="button"
                        className={
                          selectedBus?.id === bus.id
                            ? "tg-bus-selected-button"
                            : "tg-bus-select-button"
                        }
                        onClick={() => {
                          setSelectedBus(bus);
                          setError("");
                        }}
                      >
                        {selectedBus?.id === bus.id
                          ? "✓ Selected"
                          : "Select Bus"}
                      </button>
                    </div>

                  </div>

                  {selectedBus?.id === bus.id && (
                    <div className="tg-bus-selected-note">
                      ✓ This bus is selected for your booking.
                    </div>
                  )}

                </div>
              ))
            ) : (
              <div className="tg-bus-empty">
                <div>🚌</div>
                <h3>No buses found</h3>
                <p>
                  We couldn't find buses for this route. Try different
                  boarding or destination cities.
                </p>
              </div>
            )}

          </section>
        )}

        {/* Passenger Details */}
        {selectedBus && (
          <section className="tg-bus-passenger">

            <div className="tg-bus-passenger-heading">
              <span className="tg-bus-eyebrow">FINAL STEP</span>
              <h2>Complete your bus booking</h2>
              <p>Enter passenger details to confirm your journey.</p>
            </div>

            {/* Booking Summary */}
            <div className="tg-bus-summary">

              <div className="tg-bus-summary-route">
                <div>
                  <span>BOARDING POINT</span>
                  <h3>{selectedBus.from}</h3>
                  <p>{selectedBus.departure}</p>
                </div>

                <div className="tg-bus-summary-icon">🚌</div>

                <div>
                  <span>DESTINATION</span>
                  <h3>{selectedBus.to}</h3>
                  <p>{selectedBus.arrival}</p>
                </div>
              </div>

              <div className="tg-bus-summary-details">
                <div>
                  <span>Bus Operator</span>
                  <strong>{selectedBus.operator}</strong>
                </div>

                <div>
                  <span>Bus Type</span>
                  <strong>{selectedBus.type}</strong>
                </div>

                <div>
                  <span>Journey Date</span>
                  <strong>{search.date}</strong>
                </div>

                <div>
                  <span>Seats</span>
                  <strong>{search.seats} Seat(s)</strong>
                </div>

                <div className="tg-bus-total">
                  <span>Total Amount</span>
                  <strong>
                    ₹{(
                      selectedBus.price * Number(search.seats)
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>

            </div>

            {/* Passenger Form */}
            <form className="tg-bus-passenger-form" onSubmit={bookBus}>
              <h3>Passenger Information</h3>

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

              <div className="tg-bus-confirm-area">
                <div>
                  <span>YOUR TOTAL</span>
                  <h3>
                    ₹{(
                      selectedBus.price * Number(search.seats)
                    ).toLocaleString("en-IN")}
                  </h3>
                </div>

                <button type="submit" className="tg-bus-confirm-button">
                  Confirm Bus Booking <span>→</span>
                </button>
              </div>

            </form>

          </section>
        )}

        {/* Bottom Features */}
        <section className="tg-bus-bottom-info">

          <div>
            <span>🚌</span>
            <div>
              <h4>Easy Bus Booking</h4>
              <p>Find your preferred bus with ease.</p>
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
              <h4>Enjoy Your Journey</h4>
              <p>Plan your next trip with TravelGo.</p>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}

export default BusBooking;
