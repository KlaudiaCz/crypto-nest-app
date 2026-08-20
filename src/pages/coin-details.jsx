import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import CoinChart from "../components/CoinChart";
import Spinner from "../components/Spinner";
const API_URL = import.meta.env.VITE_COIN_API_URL; // Pobieramy URL z pliku .env

const CoinDetailsPage = () => {
  const { id } = useParams(); // Pobierz ID monety z parametrów URL

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`); // Pobierz dane monety z API
        if (!res.ok) throw new Error("Failed to fetch coin details");
        const data = await res.json();
        setCoin(data); // Zapisz dane monety w stanie
      } catch (err) {
        setError(err.message); // Zapisz komunikat o błędzie w stanie
      } finally {
        setLoading(false); // Zakończ tryb ładowania
      }
    };
    fetchCoin(); // Wywołaj funkcję pobierającą dane monety
  }, [id]); // Efekt uruchamiany przy zmianie ID monety

  return (
    <div className="coin-details-container">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
      <h1 className="coin-details-title">
        {coin
          ? `${coin.name} (${coin.symbol.toUpperCase()})`
          : "Coin Details"}{" "}
      </h1>
      {loading && <Spinner />} {/* Wyświetl spinner podczas ładowania */}
      {error && <div className="error">❌ {error}</div>}
      {!loading && !error && (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className="coin-details-image"
          />
          <p className="coin-details-description">
            {coin.description.en.split(". ")[0] + "."}
          </p>

          <div className="coin-summary">
            <div className="coin-summary-card">
              <div>
                <span>Rank</span>
                <strong>#{coin.market_cap_rank}</strong>
              </div>
              <div>
                <span>Current Price</span>
                <strong>
                  ${coin.market_data.current_price.usd.toLocaleString()}
                </strong>
              </div>
            </div>
          </div>

          <div className="coin-details-grid">
            <div className="detail-card">
              <span>Market Cap</span>
              <strong>
                ${coin.market_data.market_cap.usd.toLocaleString()}
              </strong>
            </div>
            <div className="detail-card">
              <span>24h High</span>
              <strong>${coin.market_data.high_24h.usd.toLocaleString()}</strong>
            </div>
            <div className="detail-card">
              <span>24h Low</span>
              <strong>${coin.market_data.low_24h.usd.toLocaleString()}</strong>
            </div>
            <div className="detail-card">
              <span>24h Price Change</span>
              <strong>
                ${coin.market_data.price_change_24h?.toFixed(2) ?? "N/A"} (
                {coin.market_data.price_change_percentage_24h?.toFixed(2) ??
                  "N/A"}
                %)
              </strong>
            </div>
            <div className="detail-card">
              <span>Circulating Supply</span>
              <strong>
                {coin.market_data.circulating_supply.toLocaleString()}
              </strong>
            </div>
            <div className="detail-card">
              <span>Total Supply</span>
              <strong>
                {coin.market_data.total_supply?.toLocaleString() || "N/A"}
              </strong>
            </div>
            <div className="detail-card">
              <span>All-Time High</span>
              <strong>
                ${coin.market_data.ath.usd.toLocaleString()} on{" "}
                {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
              </strong>
            </div>
            <div className="detail-card">
              <span>All-Time Low</span>
              <strong>
                ${coin.market_data.atl.usd.toLocaleString()} on{" "}
                {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
              </strong>
            </div>
          </div>

          <div className="coin-chart-section">
            <p className="last-updated">
              Last Updated: {new Date(coin.last_updated).toLocaleDateString()}
            </p>
            <CoinChart coinId={coin.id} />
          </div>

          <div className="coin-details-links">
            {coin.links.homepage[0] && ( // Sprawdź, czy pierwszy link w tablicy homepage istnieje
              <p>
                🌐{" "}
                <a
                  href={coin.links.homepage[0]} // Pobierz pierwszy link z tablicy homepage
                  target="_blank" // Otwórz link w nowej karcie
                  rel="noopener noreferrer" // Zapewnij bezpieczeństwo przy otwieraniu linku
                >
                  Official Website
                </a>
              </p>
            )}
            {coin.links.blockchain_site[0] && (
              <p>
                🔗{" "}
                <a
                  href={coin.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blockchain Explorer
                </a>
              </p>
            )}
            {coin.categories.length > 0 && (
              // Sprawdź, czy istnieją kategorie i wyświetl je jako listę oddzieloną przecinkami
              <p>🏷️ Categories: {coin.categories.join(", ")}</p>
            )}
          </div>
        </>
      )}
      {!loading && !error && !coin && <p>No Data Found!</p>}{" "}
      {/* Obsługa przypadku, gdy nie znaleziono danych o monecie */}
    </div>
  );
};

export default CoinDetailsPage;
