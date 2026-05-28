const BOOKINGS_KEY = "railway_bookings";

export function getBookings() {
  const savedBookings = localStorage.getItem(BOOKINGS_KEY);

  if (!savedBookings) {
    return [];
  }

  try {
    return JSON.parse(savedBookings);
  } catch {
    return [];
  }
}

export function saveBooking(bookingData) {
  const bookings = getBookings();

  const newBooking = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...bookingData,
  };

  const updatedBookings = [...bookings, newBooking];

  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));

  return newBooking;
}

export function getBookedSeats(trainId, wagonId) {
  const bookings = getBookings();

  return bookings
    .filter(
      (booking) =>
        booking.trainId === trainId && Number(booking.wagonId) === Number(wagonId)
    )
    .flatMap((booking) => booking.seats);
}

export function clearBookings() {
  localStorage.removeItem(BOOKINGS_KEY);
}