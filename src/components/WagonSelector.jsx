function WagonSelector({ wagons, selectedWagonId, onSelectWagon }) {
  return (
    <section className="booking-section">
      <h2>Оберіть вагон</h2>

      <div className="wagon-list">
        {wagons.map((wagon) => (
          <button
            key={wagon.id}
            type="button"
            className={
              selectedWagonId === wagon.id
                ? "wagon-button active-wagon"
                : "wagon-button"
            }
            onClick={() => onSelectWagon(wagon.id)}
          >
            <span>Вагон {wagon.id}</span>
            <small>{wagon.type}</small>
            <small>{wagon.seatsCount} місць</small>
          </button>
        ))}
      </div>
    </section>
  );
}

export default WagonSelector;