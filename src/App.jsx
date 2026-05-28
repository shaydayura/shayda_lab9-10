import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BookingProvider } from "./context/BookingContext";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:trainId" element={<Booking />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={2500} />
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;