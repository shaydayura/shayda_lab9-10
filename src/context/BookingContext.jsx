import { createContext, useContext, useState } from "react";
import {
  getBookings,
  getBookedSeats as getBookedSeatsFromStorage,
  saveBooking,
} from "../services/BookingService";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => getBookings());

  const addBooking = (bookingData) => {
    const newBooking = saveBooking(bookingData);
    setBookings(getBookings());
    return newBooking;
  };

  const getBookedSeats = (trainId, wagonId) => {
    return bookings
      .filter(
        (booking) =>
          booking.trainId === trainId &&
          Number(booking.wagonId) === Number(wagonId)
      )
      .flatMap((booking) => booking.seats);
  };

  const refreshBookings = () => {
    setBookings(getBookings());
  };

  const value = {
    bookings,
    addBooking,
    getBookedSeats,
    refreshBookings,
    getBookedSeatsFromStorage,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider");
  }

  return context;
}