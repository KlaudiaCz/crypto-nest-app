import Favourites from "../components/Favourites";

const FavoritesPage = ({ coins, favoriteIds, toggleFavorite }) => {
  const favoriteCoins = coins.filter((coin) => favoriteIds.includes(coin.id));

  return (
    <Favourites
      coins={favoriteCoins}
      onToggleFavorite={toggleFavorite}
      showViewMore={false}
    />
  );
};

export default FavoritesPage;
