
# ✈️ TravelGo – Travel Booking Website

TravelGo is a responsive travel booking web application built using React.js. It allows users to register, log in, explore travel services, search for flights and buses, book journeys, and manage their bookings in one place.

## 🚀 Features

### 1. User Authentication
- User Registration with personal details.
- Login using registered email and password.
- Form validation for user inputs.
- Profile page to view registration details.
- Logout functionality.

### 2. Home Page
- Modern and responsive homepage.
- Popular travel destinations.
- Travel services overview.
- Navigation to booking pages.

### 3. Flight Booking
- Search flights by source and destination.
- Select journey date and number of travelers.
- Display available flights.
- Enter passenger details.
- Confirm flight booking.

### 4. Bus Booking
- Search buses by source and destination.
- Select journey date and number of seats.
- View available buses.
- Enter passenger details.
- Confirm bus booking.

### 5. My Bookings
- View all flight and bus bookings.
- Display booking details and passenger information.
- View total booking amount.
- Cancel bookings.
- Delete bookings permanently.
- View booking status.

### 6. Trip Investment
- Add flight expenses.
- Add bus expenses.
- Enter hotel, food, travel, and other expenses.
- Calculate total trip investment.
- Reset expenses.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application functionality |
| HTML5 | Page structure |
| CSS3 | Styling and responsive design |
| Bootstrap | Responsive layouts and components |
| React Router DOM | Page navigation |
| Local Storage | Store user and booking data |
| Vite | Development environment |

## 📁 Project Structure

```text
TravelGo/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoutes.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── FlightBooking.jsx
│   │   ├── FlightBooking.css
│   │   ├── BusBooking.jsx
│   │   ├── BusBooking.css
│   │   ├── TripInvestment.jsx
│   │   ├── TripInvestment.css
│   │   ├── Flights.jsx
│   │   ├── Flights.css
│   │   ├── MyBookings.jsx
│   │   └── MyBookings.css
│   │
│   ├── data/
│   │   ├── flightGenerator.js
│   │   └── busGenerator.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Navigate to the Project Folder

```bash
cd TravelGo
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Install Required Packages

```bash
npm install react-router-dom bootstrap
```

### Step 5: Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access TravelGo.

## 💾 Data Storage

TravelGo uses browser Local Storage to store application data.

| Local Storage Key | Purpose |
|---|---|
| travelgoUsers | Registered user details |
| travelgoLoggedIn | Login status |
| travelgoBookings | Flight and bus booking details |

## 🔐 Authentication Flow

1. New users register with their details.
2. Registration information is stored in Local Storage.
3. Users can view their profile after registration.
4. Registered users log in using their email and password.
5. Protected booking pages are accessible after login.
6. Users can log out from the application.

## 📱 Responsive Design

TravelGo is designed to work on:
- Desktop computers
- Laptops
- Tablets
- Mobile devices

## 🎯 Future Enhancements

- Backend integration using Python and Django.
- Database integration using MySQL.
- Real-time flight and bus availability.
- Secure user authentication.
- Online payment gateway integration.
- Email booking confirmation.
- User profile editing.
- Booking history and reports.

## ⚠️ Project Note

This is a frontend demonstration project. Flight and bus availability is generated using sample data. User and booking information is stored in browser Local Storage. It does not currently provide real-time reservations or actual payment processing.

## 👩‍💻 Developer

**Pushpa Kumari**

B.Tech – Computer Science and Engineering

Skills: Python, SQL, HTML, CSS, JavaScript, React.js and Bootstrap.

---

⭐ Thank you for visiting TravelGo!
