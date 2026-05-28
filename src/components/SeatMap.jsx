function SeatMap({ seatsCount, selectedSeats, bookedSeats, onToggleSeat }) {
  const seats = Array.from({ length: seatsCount }, (_, index) => index + 1);

  const getSeatClassName = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return "seat booked-seat";
    }

    if (selectedSeats.includes(seatNumber)) {
      return "seat selected-seat";
    }

    return "seat free-seat";
  };

  return (
    <section className="booking-section">
      <div className="section-header">
        <h2>Оберіть місця</h2>

        <div className="legend">
          <span>
            <b className="legend-color free"></b> Вільні
          </span>
          <span>
            <b className="legend-color selected"></b> Обрані
          </span>
          <span>
            <b className="legend-color booked"></b> Заброньовані
          </span>
        </div>
      </div>

      <div className="seat-map">
        {seats.map((seatNumber) => (
          <button
            key={seatNumber}
            type="button"
            className={getSeatClassName(seatNumber)}
            disabled={bookedSeats.includes(seatNumber)}
            onClick={() => onToggleSeat(seatNumber)}
          >
            {seatNumber}
          </button>
        ))}
      </div>
    </section>
  );
}

export default SeatMap;