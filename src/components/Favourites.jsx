import CoinCard from "./CoinCard";
import { Link } from "react-router";

const Favourites = ({ coins, onToggleFavorite, showViewMore = true }) => {
  if (coins.length === 0) {
    return null;
  }

  const visibleCoins = showViewMore ? coins.slice(0, 3) : coins;

  return (
    <section className="favourites">
      <h2>Favourites</h2>
      <div className="favourites-grid">
        {visibleCoins.map((coin) => (
          <CoinCard
            key={coin.id}
            coin={coin}
            isFavorite
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      {showViewMore && coins.length >= 3 && (
        <Link className="view-more-link" to="/favorites">
          View more
        </Link>
      )}
      </div>
    </section>
  );
};

export default Favourites;
