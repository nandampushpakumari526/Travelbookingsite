
import React, { useState } from "react";
import "./TripInvestment.css";

function TripInvestment() {
  const [expenses, setExpenses] = useState({
    flight: "",
    bus: "",
    hotel: "",
    food: "",
    travel: "",
    other: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setExpenses({
      ...expenses,
      [name]: value
    });
  }

  const flightTotal = Number(expenses.flight) || 0;
  const busTotal = Number(expenses.bus) || 0;

  const otherTotal =
    (Number(expenses.hotel) || 0) +
    (Number(expenses.food) || 0) +
    (Number(expenses.travel) || 0) +
    (Number(expenses.other) || 0);

  const totalTripInvestment =
    flightTotal + busTotal + otherTotal;

  function handleReset() {
    setExpenses({
      flight: "",
      bus: "",
      hotel: "",
      food: "",
      travel: "",
      other: ""
    });
  }

  function formatAmount(amount) {
    return amount.toLocaleString("en-IN");
  }

  return (
    <div className="investment-page">
      <div className="container">

        {/* Header */}
        <div className="investment-header">
          <span className="investment-tag">TRAVELGO BUDGET PLANNER</span>
          <h1>Trip Investment Calculator</h1>
          <p>
            Plan your journey smartly. Track your travel expenses
            and manage your trip budget in one place.
          </p>
        </div>

        {/* Expense Cards */}
        <div className="row g-4">

          {/* Flight */}
          <div className="col-lg-6">
            <div className="investment-card flight-card">
              <div className="investment-card-heading">
                <div className="investment-icon flight-icon">✈️</div>
                <div>
                  <h4>Flight Investment</h4>
                  <p>Manage your flight booking cost</p>
                </div>
              </div>

              <label>Flight Amount (₹)</label>
              <input
                type="number"
                name="flight"
                min="0"
                placeholder="Enter flight amount"
                value={expenses.flight}
                onChange={handleChange}
              />

              <div className="investment-total-row">
                <span>Flight Total</span>
                <strong>₹{formatAmount(flightTotal)}</strong>
              </div>
            </div>
          </div>

          {/* Bus */}
          <div className="col-lg-6">
            <div className="investment-card bus-card">
              <div className="investment-card-heading">
                <div className="investment-icon bus-icon">🚌</div>
                <div>
                  <h4>Bus Investment</h4>
                  <p>Manage your bus booking cost</p>
                </div>
              </div>

              <label>Bus Amount (₹)</label>
              <input
                type="number"
                name="bus"
                min="0"
                placeholder="Enter bus amount"
                value={expenses.bus}
                onChange={handleChange}
              />

              <div className="investment-total-row">
                <span>Bus Total</span>
                <strong>₹{formatAmount(busTotal)}</strong>
              </div>
            </div>
          </div>

          {/* Other Expenses */}
          <div className="col-12">
            <div className="investment-card other-expenses-card">
              <div className="investment-card-heading">
                <div className="investment-icon other-icon">💰</div>
                <div>
                  <h4>Other Trip Expenses</h4>
                  <p>Add your accommodation, food and other costs</p>
                </div>
              </div>

              <div className="row g-4">

                <div className="col-md-6 col-lg-3">
                  <label>🏨 Hotel (₹)</label>
                  <input
                    type="number"
                    name="hotel"
                    min="0"
                    placeholder="Hotel amount"
                    value={expenses.hotel}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 col-lg-3">
                  <label>🍽️ Food (₹)</label>
                  <input
                    type="number"
                    name="food"
                    min="0"
                    placeholder="Food amount"
                    value={expenses.food}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 col-lg-3">
                  <label>🚕 Local Travel (₹)</label>
                  <input
                    type="number"
                    name="travel"
                    min="0"
                    placeholder="Travel amount"
                    value={expenses.travel}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 col-lg-3">
                  <label>📌 Other (₹)</label>
                  <input
                    type="number"
                    name="other"
                    min="0"
                    placeholder="Other amount"
                    value={expenses.other}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="investment-total-row other-total-row">
                <span>Other Expenses Total</span>
                <strong>₹{formatAmount(otherTotal)}</strong>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="col-12">
            <div className="total-investment-card">
              <div>
                <span className="total-label">YOUR TOTAL TRIP BUDGET</span>
                <h2>Total Trip Investment</h2>
                <p>Flight + Bus + Other Expenses</p>
              </div>

              <div className="total-amount">
                ₹{formatAmount(totalTripInvestment)}
              </div>

              <button
                className="reset-investment-btn"
                onClick={handleReset}
              >
                ↻ Reset All
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TripInvestment;
