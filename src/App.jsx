import { useState, useEffect } from "react";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import CoinDetailsPage from "./pages/coin-details";
import FavoritesPage from "./pages/favorites";
import NotFoundPage from "./pages/not-found";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [favoriteIds, setFavoriteIds] = useState([]);

  const toggleFavorite = (coinId) => {
    setFavoriteIds((previousIds) =>
      previousIds.includes(coinId)
        ? previousIds.filter((id) => id !== coinId)
        : [...previousIds, coinId],
    );
  };

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true); // uruchom tryb ładowania przy każdej zmianie limitu
      setError(null); // wyczyść poprzedni błąd
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
        );
        if (!res.ok) throw new Error("Failed to fetch data"); // jeśli odpowiedź serwera nie jest OK, zgłoś błąd
        const data = await res.json(); // sparsuj (przetworzyć dane) odpowiedź jako JSON
        setCoins(data); // zapisz dane o monetach w stanie komponentu
      } catch (err) {
        setError(err.message); // zapisz komunikat o błędzie w stanie
      } finally {
        setLoading(false); // zakończ tryb ładowania niezależnie od wyniku
      }
    };
    fetchCoins(); // wywołaj funkcję pobierającą dane o monetach
  }, [limit]); // efekt uruchamiany przy zmianie limitu

  return (
    <div className="app-shell">
      <main className="page-content">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                coins={coins}
                filter={filter}
                setFilter={setFilter}
                limit={limit}
                setLimit={setLimit}
                sortBy={sortBy}
                setSortBy={setSortBy}
                loading={loading}
                error={error}
                favoriteIds={favoriteIds}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/coin/:id" element={<CoinDetailsPage />} />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                coins={coins}
                favoriteIds={favoriteIds}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
