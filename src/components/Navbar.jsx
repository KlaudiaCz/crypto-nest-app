import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo" aria-label="CryptoNest home">
        <img src="/public/logo.png" alt="" />
        <h1>
          <span>Crypto</span>Nest
        </h1>
      </Link>
      <div className="top-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </nav>
  );
};

export default Navbar;
