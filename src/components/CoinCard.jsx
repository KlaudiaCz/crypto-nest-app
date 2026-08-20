import { useState } from "react";
import { Star, StarCheck, StarPlus, StarMinus } from "lucide-react";
import { Link } from "react-router";

const CoinCard = ({ coin, isFavorite, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);

  const priceChange = coin.price_change_percentage_24h;
  const priceChangeText =
    priceChange !== null && priceChange !== undefined
      ? `${priceChange.toFixed(2)} %`
      : "N/A";
  const priceChangeClass =
    priceChange !== null && priceChange !== undefined
      ? priceChange >= 0
        ? "positive"
        : "negative"
      : "neutral";
  const FavoriteIcon = isFavorite
    ? isHovered
      ? StarMinus
      : StarCheck
    : isHovered
      ? StarPlus
      : Star;

  return (
    <div className="coin-card">
      <button
        type="button"
        className="favorite-btn"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onToggleFavorite(coin.id)}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FavoriteIcon
          size={24}
          fill={isFavorite ? "#f59e0b" : "none"}
          stroke={isFavorite ? "#F59E0B" : "currentColor"}
        />
      </button>

      <Link to={`/coin/${coin.id}`}>
        <div className="coin-header">
          <img src={coin.image} alt={coin.name} className="coin-image" />
          <div>
            <h2>{coin.name}</h2>
            <p className="symbol">{coin.symbol?.toUpperCase()}</p>
          </div>
        </div>
        <p>Price: ${coin.current_price?.toLocaleString()}</p>
        <p className={priceChangeClass}>{priceChangeText}</p>
        <p>Market Cap: {coin.market_cap?.toLocaleString()}</p>
      </Link>
    </div>
  );
};

export default CoinCard;
