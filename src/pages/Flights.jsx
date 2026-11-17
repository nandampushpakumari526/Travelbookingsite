
import React, { useState } from "react";
import "./Flights.css";

function Flights() {

    // Trip type
    const [tripType, setTripType] = useState("oneway");

    // Search details
    const [formData, setFormData] = useState({
        from: "",
        to: "",
        departureDate: "",
        returnDate: "",
        travelers: "1"
    });

    // Error messages
    const [errors, setErrors] = useState({});

    // Flight results
    const [availableFlights, setAvailableFlights] = useState([]);
    const [searched, setSearched] = useState(false);

    // Selected flight
    const [selectedFlight, setSelectedFlight] = useState(null);

    // Passenger details
    const [passenger, setPassenger] = useState({
        name: "",
        email: "",
        phone: ""
    });

    // Payment details
    const [payment, setPayment] = useState({
        method: "",
        upiId: ""
    });

    // Booking and ticket
    const [ticket, setTicket] = useState(null);
    const [paymentError, setPaymentError] = useState("");

    // Demo flight data
    const flightData = [
        {
            id: 1,
            airline: "IndiGo",
            from: "Hyderabad",
            to: "Delhi",
            departure: "06:30 AM",
            arrival: "08:45 AM",
            duration: "2h 15m",
            price: 4500,
            seats: 12
        },
        {
            id: 2,
            airline: "Air India",
            from: "Hyderabad",
            to: "Delhi",
            departure: "10:00 AM",
            arrival: "12:30 PM",
            duration: "2h 30m",
            price: 5200,
            seats: 8
        },
        {
            id: 3,
            airline: "SpiceJet",
            from: "Vijayawada",
            to: "Hyderabad",
            departure: "09:00 AM",
            arrival: "10:15 AM",
            duration: "1h 15m",
            price: 3200,
            seats: 15
        },
        {
            id: 4,
            airline: "Air India",
            from: "Delhi",
            to: "Mumbai",
            departure: "02:00 PM",
            arrival: "04:10 PM",
            duration: "2h 10m",
            price: 4800,
            seats: 10
        },
        {
            id: 5,
            airline: "IndiGo",
            from: "Chennai",
            to: "Bangalore",
            departure: "07:00 AM",
            arrival: "08:00 AM",
            duration: "1h",
            price: 2800,
            seats: 6
        }
    ];

    const today = new Date().toLocaleDateString("en-CA");

    // Update search inputs
    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ""
        });
    }

    // Search validation
    function validateSearch() {

        let newErrors = {};

        if (!formData.from.trim()) {
            newErrors.from = "Please enter departure city";
        }

        if (!formData.to.trim()) {
            newErrors.to = "Please enter destination city";
        }

        if (!formData.departureDate) {
            newErrors.departureDate = "Please select departure date";
        } else if (formData.departureDate < today) {
            newErrors.departureDate = "Select today or a future date";
        }

        if (
            formData.from.trim().toLowerCase() ===
            formData.to.trim().toLowerCase() &&
            formData.from.trim()
        ) {
            newErrors.to = "From and To cities cannot be the same";
        }

        if (tripType === "roundtrip") {

            if (!formData.returnDate) {
                newErrors.returnDate = "Please select return date";
            } else if (
                formData.returnDate < formData.departureDate
            ) {
                newErrors.returnDate =
                    "Return date cannot be before departure date";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    // Search flights
    function handleSearch(e) {

        e.preventDefault();

        if (!validateSearch()) {
            return;
        }

        const results = flightData.filter((flight) => {

            return (
                flight.from.toLowerCase() ===
                    formData.from.trim().toLowerCase() &&

                flight.to.toLowerCase() ===
                    formData.to.trim().toLowerCase() &&

                flight.seats >= Number(formData.travelers)
            );
        });

        setAvailableFlights(results);
        setSearched(true);

        setSelectedFlight(null);
        setTicket(null);
        setPaymentError("");
    }

    // Select flight
    function handleBook(flight) {

        setSelectedFlight(flight);
        setTicket(null);
        setPaymentError("");

        document.getElementById("payment-section")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // Update passenger inputs
    function handlePassengerChange(e) {

        const { name, value } = e.target;

        setPassenger({
            ...passenger,
            [name]: value
        });
    }

    // Update payment inputs
    function handlePaymentChange(e) {

        const { name, value } = e.target;

        setPayment({
            ...payment,
            [name]: value
        });

        setPaymentError("");
    }

    // Generate ticket
    function handlePayment(e) {

        e.preventDefault();

        if (!passenger.name.trim()) {
            setPaymentError("Please enter passenger name");
            return;
        }

        if (!passenger.email.trim()) {
            setPaymentError("Please enter email address");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)) {
            setPaymentError("Please enter a valid email address");
            return;
        }

        if (!/^[0-9]{10}$/.test(passenger.phone)) {
            setPaymentError("Enter a valid 10-digit phone number");
            return;
        }

        if (!payment.method) {
            setPaymentError("Please select a payment method");
            return;
        }

        if (
            payment.method === "UPI" &&
            !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(payment.upiId)
        ) {
            setPaymentError("Please enter a valid demo UPI ID");
            return;
        }

        const totalAmount =
            selectedFlight.price * Number(formData.travelers);

        const newTicket = {

            bookingId: "TG" + Date.now(),

            passenger: { ...passenger },

            flight: { ...selectedFlight },

            search: { ...formData },

            payment: {
                ...payment,
                amount: totalAmount,
                status: "Demo Payment Successful"
            },

            bookingDate: new Date().toLocaleDateString()

        };

        setTicket(newTicket);
        setPaymentError("");

        setTimeout(() => {
            document.getElementById("ticket-section")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    }

    // Start a new search
    function handleNewSearch() {

        setSearched(false);
        setSelectedFlight(null);
        setTicket(null);

        setPassenger({
            name: "",
            email: "",
            phone: ""
        });

        setPayment({
            method: "",
            upiId: ""
        });

        setErrors({});
        setPaymentError("");
    }

    return (

        <div className="flight-page">

            {/* FLIGHT BANNER */}

            <div className="flight-banner">

                <h1>Find Your Perfect Flight</h1>

                <p>Explore the world with TravelGo</p>

            </div>


            {/* SEARCH SECTION */}

            <div className="container flight-container">

                <div className="flight-form-card">

                    <h2 className="text-center mb-4">
                        ✈️ Search Flights
                    </h2>

                    <div className="d-flex gap-4 mb-4">

                        <label>
                            <input
                                type="radio"
                                checked={tripType === "oneway"}
                                onChange={() => {
                                    setTripType("oneway");
                                    setFormData({
                                        ...formData,
                                        returnDate: ""
                                    });
                                }}
                            />
                            {" "}One Way
                        </label>

                        <label>
                            <input
                                type="radio"
                                checked={tripType === "roundtrip"}
                                onChange={() => setTripType("roundtrip")}
                            />
                            {" "}Round Trip
                        </label>

                    </div>

                    <form onSubmit={handleSearch}>

                        <div className="row g-3">

                            <div className="col-md-6">

                                <label className="form-label">From</label>

                                <input
                                    type="text"
                                    name="from"
                                    className={`form-control ${errors.from ? "is-invalid" : ""}`}
                                    placeholder="Starting city"
                                    value={formData.from}
                                    onChange={handleChange}
                                />

                                {errors.from && (
                                    <small className="field-error">
                                        {errors.from}
                                    </small>
                                )}

                            </div>


                            <div className="col-md-6">

                                <label className="form-label">To</label>

                                <input
                                    type="text"
                                    name="to"
                                    className={`form-control ${errors.to ? "is-invalid" : ""}`}
                                    placeholder="Destination city"
                                    value={formData.to}
                                    onChange={handleChange}
                                />

                                {errors.to && (
                                    <small className="field-error">
                                        {errors.to}
                                    </small>
                                )}

                            </div>


                            <div className="col-md-6">

                                <label className="form-label">
                                    Departure Date
                                </label>

                                <input
                                    type="date"
                                    name="departureDate"
                                    min={today}
                                    className={`form-control ${errors.departureDate ? "is-invalid" : ""}`}
                                    value={formData.departureDate}
                                    onChange={handleChange}
                                />

                                {errors.departureDate && (
                                    <small className="field-error">
                                        {errors.departureDate}
                                    </small>
                                )}

                            </div>


                            {tripType === "roundtrip" && (

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Return Date
                                    </label>

                                    <input
                                        type="date"
                                        name="returnDate"
                                        min={formData.departureDate || today}
                                        className={`form-control ${errors.returnDate ? "is-invalid" : ""}`}
                                        value={formData.returnDate}
                                        onChange={handleChange}
                                    />

                                    {errors.returnDate && (
                                        <small className="field-error">
                                            {errors.returnDate}
                                        </small>
                                    )}

                                </div>

                            )}


                            <div className="col-md-6">

                                <label className="form-label">
                                    Travellers
                                </label>

                                <select
                                    name="travelers"
                                    className="form-select"
                                    value={formData.travelers}
                                    onChange={handleChange}
                                >

                                    {[1, 2, 3, 4, 5, 6].map((n) => (

                                        <option key={n} value={n}>
                                            {n} {n === 1 ? "Traveller" : "Travellers"}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            <div className="col-12">

                                <button
                                    type="submit"
                                    className="btn btn-warning w-100 search-btn"
                                >
                                    Search Flights
                                </button>

                            </div>

                        </div>

                    </form>

                </div>


                {/* FLIGHT AVAILABILITY SECTION */}

                {searched && (

                    <div className="availability-section" id="availability-section">

                        <h2 className="text-center mb-2">
                            Available Flights
                        </h2>

                        <p className="text-center text-muted mb-4">
                            {formData.from} → {formData.to}
                            {" | "}
                            {formData.departureDate}
                        </p>

                        {availableFlights.length === 0 ? (

                            <div className="no-flights">

                                <h4>✈️ No Flights Available</h4>

                                <p>
                                    No matching demo flights found.
                                    Please try another route.
                                </p>

                                <button
                                    className="btn btn-outline-primary"
                                    onClick={handleNewSearch}
                                >
                                    Search Again
                                </button>

                            </div>

                        ) : (

                            availableFlights.map((flight) => (

                                <div className="flight-card" key={flight.id}>

                                    <div className="flight-airline">

                                        <h5>✈️ {flight.airline}</h5>

                                        <small>Flight TG00{flight.id}</small>

                                    </div>

                                    <div className="flight-time">

                                        <h4>{flight.departure}</h4>

                                        <p>{flight.from}</p>

                                    </div>

                                    <div className="flight-duration">

                                        <span>{flight.duration}</span>

                                        <hr />

                                        <small>Direct Flight</small>

                                    </div>

                                    <div className="flight-time">

                                        <h4>{flight.arrival}</h4>

                                        <p>{flight.to}</p>

                                    </div>

                                    <div className="flight-price">

                                        <h4>
                                            ₹{flight.price * Number(formData.travelers)}
                                        </h4>

                                        <small>
                                            {flight.seats} demo seats
                                        </small>

                                    </div>

                                    <button
                                        className="btn btn-warning book-btn"
                                        onClick={() => handleBook(flight)}
                                    >
                                        Book Now
                                    </button>

                                </div>

                            ))

                        )}

                        <p className="demo-note">
                            Demo flight schedules and prices only.
                            Not real-time airline availability.
                        </p>

                    </div>

                )}


                {/* PASSENGER AND PAYMENT SECTION */}

                {selectedFlight && !ticket && (

                    <div className="payment-section" id="payment-section">

                        <h2 className="text-center mb-2">
                            Passenger & Payment Details
                        </h2>

                        <p className="text-center text-muted mb-4">
                            Complete your booking with TravelGo
                        </p>


                        {/* Selected flight */}

                        <div className="selected-flight">

                            <h5 className="text-primary">
                                Selected Flight: {selectedFlight.airline}
                            </h5>

                            <div className="row mt-3">

                                <div className="col-6">
                                    <h4>{selectedFlight.departure}</h4>
                                    <p>{selectedFlight.from}</p>
                                </div>

                                <div className="col-6 text-end">
                                    <h4>{selectedFlight.arrival}</h4>
                                    <p>{selectedFlight.to}</p>
                                </div>

                            </div>

                            <hr />

                            <div className="d-flex justify-content-between">
                                <span>Travellers</span>
                                <strong>{formData.travelers}</strong>
                            </div>

                            <div className="d-flex justify-content-between mt-2">
                                <span>Travel Date</span>
                                <strong>{formData.departureDate}</strong>
                            </div>

                            <div className="d-flex justify-content-between mt-2">
                                <span>Price per Traveller</span>
                                <strong>₹{selectedFlight.price}</strong>
                            </div>

                            <div className="d-flex justify-content-between mt-3 total-price">
                                <strong>Total Amount</strong>
                                <strong>
                                    ₹{selectedFlight.price * Number(formData.travelers)}
                                </strong>
                            </div>

                        </div>


                        {/* Passenger form */}

                        <form onSubmit={handlePayment}>

                            <h4 className="mb-3 mt-4">
                                Passenger Information
                            </h4>

                            <div className="row g-3">

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Passenger Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter full name"
                                        value={passenger.name}
                                        onChange={handlePassengerChange}
                                        required
                                    />

                                </div>


                                <div className="col-md-6">

                                    <label className="form-label">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={passenger.email}
                                        onChange={handlePassengerChange}
                                        required
                                    />

                                </div>


                                <div className="col-md-6">

                                    <label className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control"
                                        placeholder="10 digit phone number"
                                        maxLength="10"
                                        value={passenger.phone}
                                        onChange={handlePassengerChange}
                                        required
                                    />

                                </div>

                            </div>


                            {/* Payment */}

                            <h4 className="mt-4 mb-3">
                                Payment Details
                            </h4>

                            <div className="payment-methods">

                                <label className="payment-option">

                                    <input
                                        type="radio"
                                        name="method"
                                        value="UPI"
                                        checked={payment.method === "UPI"}
                                        onChange={handlePaymentChange}
                                    />

                                    <span>📱 UPI</span>

                                </label>


                                <label className="payment-option">

                                    <input
                                        type="radio"
                                        name="method"
                                        value="Card"
                                        checked={payment.method === "Card"}
                                        onChange={handlePaymentChange}
                                    />

                                    <span>💳 Card</span>

                                </label>


                                <label className="payment-option">

                                    <input
                                        type="radio"
                                        name="method"
                                        value="Net Banking"
                                        checked={payment.method === "Net Banking"}
                                        onChange={handlePaymentChange}
                                    />

                                    <span>🏦 Net Banking</span>

                                </label>

                            </div>


                            {payment.method === "UPI" && (

                                <div className="mt-3">

                                    <label className="form-label">
                                        UPI ID (Demo)
                                    </label>

                                    <input
                                        type="text"
                                        name="upiId"
                                        className="form-control"
                                        placeholder="example@upi"
                                        value={payment.upiId}
                                        onChange={handlePaymentChange}
                                    />

                                </div>

                            )}


                            {payment.method === "Card" && (

                                <div className="alert alert-info mt-3">
                                    Demo card payment selected.
                                    No real card details are required.
                                </div>

                            )}


                            {payment.method === "Net Banking" && (

                                <div className="alert alert-info mt-3">
                                    Demo net banking payment selected.
                                </div>

                            )}


                            {paymentError && (

                                <div className="payment-error">
                                    {paymentError}
                                </div>

                            )}


                            <button
                                type="submit"
                                className="btn btn-success w-100 mt-4 payment-btn"
                            >
                                Pay & Generate Ticket
                            </button>


                            <button
                                type="button"
                                className="btn btn-outline-secondary w-100 mt-2"
                                onClick={() => setSelectedFlight(null)}
                            >
                                Change Flight
                            </button>

                        </form>

                    </div>

                )}


                {/* TICKET GENERATION */}

                {ticket && (

                    <div className="ticket-section" id="ticket-section">

                        <div className="ticket-success text-center">

                            <div className="success-icon">✓</div>

                            <h2>Booking Confirmed!</h2>

                            <p>Your TravelGo demo ticket has been generated.</p>

                        </div>


                        <div className="ticket-card">

                            <div className="ticket-header">

                                <h3>✈️ TravelGo</h3>

                                <span>FLIGHT E-TICKET</span>

                            </div>

                            <hr />

                            <div className="booking-id">
                                <small>BOOKING REFERENCE</small>
                                <h3>{ticket.bookingId}</h3>
                            </div>

                            <hr />

                            <div className="row">

                                <div className="col-6">
                                    <small>FROM</small>
                                    <h4>{ticket.flight.from}</h4>
                                    <strong>{ticket.flight.departure}</strong>
                                </div>

                                <div className="col-6 text-end">
                                    <small>TO</small>
                                    <h4>{ticket.flight.to}</h4>
                                    <strong>{ticket.flight.arrival}</strong>
                                </div>

                            </div>

                            <hr />

                            <div className="ticket-info">

                                <p>
                                    <strong>Airline:</strong> {ticket.flight.airline}
                                </p>

                                <p>
                                    <strong>Travel Date:</strong> {ticket.search.departureDate}
                                </p>

                                <p>
                                    <strong>Passenger:</strong> {ticket.passenger.name}
                                </p>

                                <p>
                                    <strong>Email:</strong> {ticket.passenger.email}
                                </p>

                                <p>
                                    <strong>Phone:</strong> {ticket.passenger.phone}
                                </p>

                                <p>
                                    <strong>Travellers:</strong> {ticket.search.travelers}
                                </p>

                                <p>
                                    <strong>Trip Type:</strong> {ticket.search.tripType || tripType}
                                </p>

                                <p>
                                    <strong>Payment Method:</strong> {ticket.payment.method}
                                </p>

                                <p>
                                    <strong>Payment Status:</strong>
                                    <span className="text-success"> Demo Successful</span>
                                </p>

                                <h4 className="text-success mt-3">
                                    Total Paid: ₹{ticket.payment.amount}
                                </h4>

                            </div>

                            <div className="ticket-footer">
                                Thank you for choosing TravelGo!
                                <br />
                                Have a wonderful journey.
                            </div>

                        </div>


                        <div className="ticket-actions">

                            <button
                                className="btn btn-primary"
                                onClick={() => window.print()}
                            >
                                🖨️ Print Ticket
                            </button>

                            <button
                                className="btn btn-warning"
                                onClick={handleNewSearch}
                            >
                                Book Another Flight
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );
}

export default Flights;
