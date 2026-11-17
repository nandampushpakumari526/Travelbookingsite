
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";

function Home({ isLoggedIn }) {
  const navigate = useNavigate();

  function goToPage(path) {
    navigate(isLoggedIn ? path : "/login");
  }

  
const destinations = [
  {
    name: "Goa",
    description: "Beautiful beaches and amazing sunsets",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800"
  },
  {
    name: "Kerala",
    description: "Peaceful backwaters and green landscapes",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800"
  },
  {
    name: "Hyderabad",
    description: "Explore historical places and city life",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800"
  },
  {
    name: "Manali",
    description: "Snow-covered mountains and beautiful valleys",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800"
  },
  {
    name: "Jaipur",
    description: "Royal palaces and colourful culture",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800"
  },
  {
    name: "Agra",
    description: "Discover the beautiful Taj Mahal",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800"
  },
  {
    name: "Kashmir",
    description: "Heavenly mountains and scenic lakes",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800"
  },
  {
    name: "Ooty",
    description: "Green hills and beautiful tea gardens",
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800"
  },
  {
    name: "Mumbai",
    description: "Experience the city that never sleeps",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800"
  },
  {
    name: "Darjeeling",
    description: "Tea gardens and stunning mountain views",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800"
  },
  {
    name: "Munnar",
    description: "Beautiful hills and peaceful nature",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800"
  },
  {
    name: "Andaman",
    description: "Crystal-clear water and tropical beaches",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800"
  }
];

  return (
    <div className="travelgo-home">

      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <div className="hero-text">
                <span className="hero-label">
                  YOUR JOURNEY STARTS HERE
                </span>

                <h1>
                  Discover The World.
                  <span> Travel Without Limits.</span>
                </h1>

                <p>
                  Explore beautiful destinations, book your flights
                  and buses, and manage your travel expenses.
                  Everything you need for your journey is here.
                </p>

                <div className="hero-actions">
                  <button
                    className="home-primary-btn"
                    onClick={() => goToPage("/flight-booking")}
                  >
                    Start Your Journey →
                  </button>

                  <a href="#destinations" className="home-outline-btn">
                    Explore Places
                  </a>
                </div>

                <div className="hero-highlights">
                  <div>
                    <strong>✈️</strong>
                    <span>Flight Booking</span>
                  </div>
                  <div>
                    <strong>🚌</strong>
                    <span>Bus Booking</span>
                  </div>
                  <div>
                    <strong>💰</strong>
                    <span>Budget Planning</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-image-area">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000"
                  alt="Beautiful mountain destination"
                  className="hero-main-image"
                />

                <div className="hero-floating-card">
                  <span>🌍</span>
                  <div>
                    <strong>Explore More</strong>
                    <small>Your next adventure awaits</small>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="home-destinations" id="destinations">
        <div className="container">

          <div className="home-section-heading">
            <span>EXPLORE THE WORLD</span>
            <h2>Popular Destinations</h2>
            <p>
              Discover amazing places and find inspiration
              for your next trip.
            </p>
          </div>

          <div className="row g-4">
            {destinations.map((place) => (
              <div className="col-md-4" key={place.name}>
                <div className="place-card">
                  <div className="place-image">
                    <img src={place.image} alt={place.name} />
                  </div>

                  <div className="place-details">
                    <span>📍 INDIA</span>
                    <h3>{place.name}</h3>
                    <p>{place.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="home-services" id="services">
        <div className="container">

          <div className="home-section-heading">
            <span>TRAVEL MADE SIMPLE</span>
            <h2>Our Services</h2>
            <p>
              Plan, book and manage your travel with
              our convenient services.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="home-service-card">
                <div className="service-symbol flight-symbol">✈️</div>
                <h3>Flight Booking</h3>
                <p>
                  Explore available flight options and plan
                  comfortable journeys to your destination.
                </p>
                <button onClick={() => goToPage("/flight-booking")}>
                  Explore Flights →
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <div className="home-service-card">
                <div className="service-symbol bus-symbol">🚌</div>
                <h3>Bus Booking</h3>
                <p>
                  Find suitable buses and organize your
                  road trips with ease.
                </p>
                <button onClick={() => goToPage("/bus-booking")}>
                  Explore Buses →
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <div className="home-service-card">
                <div className="service-symbol money-symbol">💰</div>
                <h3>Trip Investment</h3>
                <p>
                  Calculate your travel expenses and
                  keep your trip budget organized.
                </p>
                <button onClick={() => goToPage("/trip-investment")}>
                  Manage Expenses →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="home-about" id="about">
        <div className="container">
          <div className="row align-items-center g-5">

            <div className="col-lg-6">
              <div className="about-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000"
                  alt="Beautiful nature and travel"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-text">
                <span>ABOUT TRAVELGO</span>
                <h2>Making Every Journey Special</h2>

                <p>
                  TravelGo is designed to make travel planning
                  simple and convenient. We bring different
                  travel services together in one platform.
                </p>

                <p>
                  Whether you want to book a flight, find a bus
                  or calculate your trip expenses, TravelGo
                  helps you organize your journey.
                </p>

                <button onClick={() => goToPage("/flight-booking")}>
                  Plan Your Trip →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="container">
          <h2>Your Next Adventure Is Waiting!</h2>
          <p>
            Start exploring new destinations and make
            unforgettable travel memories.
          </p>
          <button onClick={() => goToPage("/flight-booking")}>
            Book Your Journey →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="container">
          <div className="row g-4">

            <div className="col-lg-4">
              <h2>Travel<span>Go.</span></h2>
              <p>
                Discover new destinations, plan comfortable
                journeys and make every trip memorable.
              </p>
            </div>

            <div className="col-6 col-lg-2">
              <h5>Quick Links</h5>
              <Link to="/">Home</Link>
              <a href="#about">About Us</a>
              <a href="#destinations">Destinations</a>
              <a href="#services">Our Services</a>
            </div>

            <div className="col-6 col-lg-3">
              <h5>Services</h5>
              <a href="/flight-booking" onClick={(e) => {
                e.preventDefault();
                goToPage("/flight-booking");
              }}>Flight Booking</a>
              <a href="/bus-booking" onClick={(e) => {
                e.preventDefault();
                goToPage("/bus-booking");
              }}>Bus Booking</a>
              <a href="/trip-investment" onClick={(e) => {
                e.preventDefault();
                goToPage("/trip-investment");
              }}>Trip Investment</a>
            </div>

            <div className="col-lg-3">
              <h5>Get Started</h5>
              <p>Make your next journey memorable with TravelGo.</p>
              <button onClick={() => goToPage("/flight-booking")}>
                Start Exploring →
              </button>
            </div>

          </div>

          <div className="home-footer-bottom">
            © 2026 TravelGo. All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;
