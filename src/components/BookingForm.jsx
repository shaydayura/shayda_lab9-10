function BookingForm({
  passenger,
  selectedSeats,
  onPassengerChange,
  onSubmit,
}) {
  return (
    <section className="booking-section">
      <h2>Дані пасажира</h2>

      <form className="booking-form" onSubmit={onSubmit}>
        <label>
          Ім’я
          <input
            type="text"
            name="name"
            placeholder="Наприклад, Олег Гусак"
            value={passenger.name}
            onChange={onPassengerChange}
          />
        </label>

        <label>
          Телефон
          <input
            type="tel"
            name="phone"
            placeholder="+380XXXXXXXXX"
            value={passenger.phone}
            onChange={onPassengerChange}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={passenger.email}
            onChange={onPassengerChange}
          />
        </label>

        <div className="booking-summary">
          <strong>Обрані місця:</strong>{" "}
          {selectedSeats.length > 0 ? selectedSeats.join(", ") : "не обрано"}
        </div>

        <button className="submit-booking" type="submit">
          Забронювати квиток
        </button>
      </form>
    </section>
  );
}

export default BookingForm;