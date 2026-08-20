import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo" aria-label="CryptoNest home">
        <img src="/logo.png" alt="" />
        <h1>
          <span>Crypto</span>Nest
        </h1>
      </Link>

      <button
        type="button"
        className="menu-toggle"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className={`top-nav${isMenuOpen ? " is-open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About
        </Link>
        <a
          href="https://github.com/KlaudiaCz/crypto-nest-app"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
        >
          GitHub
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
