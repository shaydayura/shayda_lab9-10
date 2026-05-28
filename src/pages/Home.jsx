import { useState } from "react";
import TrainList from "../components/TrainList";
import { trains } from "../data/trains";

function Home() {
  const [search, setSearch] = useState("");

  const filteredTrains = trains.filter((train) => {
    const searchText = search.toLowerCase();

    return (
      train.number.toLowerCase().includes(searchText) ||
      train.from.toLowerCase().includes(searchText) ||
      train.to.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="page">
      <section className="hero-section">
        <p className="subtitle">Укрзалізниця</p>
        <h1>
            <span>Пошук і бронювання</span>
            <span>залізничних квитків</span>
        </h1>
        <p className="description">
          Оберіть потрібний рейс, перегляньте маршрут, час відправлення
          та перейдіть до вибору місць у вагоні.
        </p>

        <input
          className="search-input"
          type="text"
          placeholder="Пошук за номером потяга або маршрутом..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </section>

      <TrainList trains={filteredTrains} />
    </main>
  );
}

export default Home;