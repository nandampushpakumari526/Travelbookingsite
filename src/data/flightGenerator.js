
export function generateFlights(from, to) {
  const airlines = [
    {
      id: 1,
      airline: "IndiGo",
      departure: "06:00 AM",
      arrival: "08:30 AM",
      duration: "2h 30m",
      price: 4500
    },
    {
      id: 2,
      airline: "Air India",
      departure: "09:00 AM",
      arrival: "11:45 AM",
      duration: "2h 45m",
      price: 5200
    },
    {
      id: 3,
      airline: "Akasa Air",
      departure: "01:00 PM",
      arrival: "03:20 PM",
      duration: "2h 20m",
      price: 4800
    },
    {
      id: 4,
      airline: "SpiceJet",
      departure: "05:00 PM",
      arrival: "07:40 PM",
      duration: "2h 40m",
      price: 4300
    }
  ];

  return airlines.map((flight) => ({
    ...flight,
    from,
    to
  }));
}
