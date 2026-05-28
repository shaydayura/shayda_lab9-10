import { Link } from "react-router-dom";

function TrainCard({ train }) {
  return (
    <article className="train-card">
      <div className="train-card-header">
        <div>
          <span className="train-label">Потяг</span>
          <h2>№ {train.number}</h2>
        </div>

        <span className="price">{train.price} грн</span>
      </div>

      <div className="route">
        <span>{train.from}</span>
        <span className="arrow">→</span>
        <span>{train.to}</span>
      </div>

      <div className="train-info">
        <p>
          <strong>Дата:</strong> {train.departureDate}
        </p>
        <p>
          <strong>Відправлення:</strong> {train.departureTime}
        </p>
        <p>
          <strong>Тривалість:</strong> {train.duration}
        </p>
      </div>

      <Link className="booking-link" to={`/booking/${train.id}`}>
        Обрати місця
      </Link>
    </article>
  );
}

export default TrainCard;