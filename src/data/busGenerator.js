
export function generateBuses(from, to) {
  const buses = [
    {
      id: 1,
      operator: "Orange Travels",
      type: "AC Sleeper",
      departure: "08:00 PM",
      arrival: "06:00 AM",
      duration: "10 Hours",
      price: 1200
    },
    {
      id: 2,
      operator: "VRL Travels",
      type: "Non-AC Sleeper",
      departure: "09:30 PM",
      arrival: "07:30 AM",
      duration: "10 Hours",
      price: 900
    },
    {
      id: 3,
      operator: "SRS Travels",
      type: "AC Seater",
      departure: "10:00 PM",
      arrival: "08:00 AM",
      duration: "10 Hours",
      price: 1000
    },
    {
      id: 4,
      operator: "Kaveri Travels",
      type: "AC Sleeper",
      departure: "07:00 PM",
      arrival: "05:30 AM",
      duration: "10h 30m",
      price: 1400
    }
  ];

  return buses.map((bus) => ({
    ...bus,
    from,
    to
  }));
}
