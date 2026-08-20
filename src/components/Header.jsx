import { Link } from "react-router";

const Header = () => {
  return (
    <div className="navbar">
      <div className="title">
        <img src="/public/logo.png" /> {/* logo aplikacji */}
        <h1>
          <span>Crypto</span>Nest
        </h1>
      </div>
      <div className="top-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </div>
  );
};

export default Header;
