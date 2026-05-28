import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { trains } from "../data/trains";
import { useBooking } from "../context/BookingContext";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";

function Booking() {
  const { trainId } = useParams();
  const train = trains.find((item) => item.id === trainId);

  const { addBooking, getBookedSeats } = useBooking();

  const [selectedWagonId, setSelectedWagonId] = useState(
    train ? train.wagons[0].id : null
  );

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [passenger, setPassenger] = useState({
    name: "",
    phone: "",
    email: "",
  });

  if (!train) {
    return (
      <main className="page">
        <div className="not-found-card">
          <h1>Потяг не знайдено</h1>
          <Link className="back-link" to="/">
            Повернутися до списку потягів
          </Link>
        </div>
      </main>
    );
  }

  const selectedWagon = train.wagons.find(
    (wagon) => wagon.id === selectedWagonId
  );

  const bookedSeats = getBookedSeats(train.id, selectedWagonId);

  const handleSelectWagon = (wagonId) => {
    setSelectedWagonId(wagonId);
    setSelectedSeats([]);
  };

  const handleToggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return;
    }

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handlePassengerChange = (event) => {
    const { name, value } = event.target;

    setPassenger({
      ...passenger,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (selectedSeats.length === 0) {
      toast.error("Оберіть хоча б одне місце.");
      return false;
    }

    if (passenger.name.trim().length < 2) {
      toast.error("Введіть коректне ім’я пасажира.");
      return false;
    }

    const phoneRegex = /^\+380\d{9}$/;

    if (!phoneRegex.test(passenger.phone.trim())) {
      toast.error("Телефон має бути у форматі +380XXXXXXXXX.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(passenger.email.trim())) {
      toast.error("Введіть коректний email.");
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    addBooking({
      trainId: train.id,
      trainNumber: train.number,
      route: `${train.from} → ${train.to}`,
      departureDate: train.departureDate,
      departureTime: train.departureTime,
      wagonId: selectedWagonId,
      wagonType: selectedWagon.type,
      seats: selectedSeats,
      passenger: {
        name: passenger.name.trim(),
        phone: passenger.phone.trim(),
        email: passenger.email.trim(),
      },
    });

    toast.success("Квиток успішно заброньовано!");

    setSelectedSeats([]);
    setPassenger({
      name: "",
      phone: "",
      email: "",
    });
  };

  return (
    <main className="page">
      <div className="booking-page">
        <Link className="back-link" to="/">
          ← Повернутися до списку потягів
        </Link>

        <section className="booking-hero">
          <p className="subtitle">Бронювання квитка</p>
          <h1>
            Потяг № {train.number}: {train.from} → {train.to}
          </h1>

          <div className="booking-trip-info">
            <span>Дата: {train.departureDate}</span>
            <span>Відправлення: {train.departureTime}</span>
            <span>Тривалість: {train.duration}</span>
          </div>
        </section>

        <WagonSelector
          wagons={train.wagons}
          selectedWagonId={selectedWagonId}
          onSelectWagon={handleSelectWagon}
        />

        <SeatMap
          seatsCount={selectedWagon.seatsCount}
          selectedSeats={selectedSeats}
          bookedSeats={bookedSeats}
          onToggleSeat={handleToggleSeat}
        />

        <BookingForm
          passenger={passenger}
          selectedSeats={selectedSeats}
          onPassengerChange={handlePassengerChange}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}

export default Booking;