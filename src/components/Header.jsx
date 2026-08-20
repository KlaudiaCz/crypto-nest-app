const Header = () => {
  return (
    <header className="site-header">
      <div className="header-copy">
        <p className="header-eyebrow">MARKET OVERVIEW</p>
        <h2>Follow the market at a glance.</h2>
        <p>
          Track the most important crypto signals before you explore the
          details.
        </p>
      </div>
      <div className="market-strip" aria-label="Crypto market status">
        <span className="market-chip">
          <strong>BTC</strong>
          <small>LIVE</small>
        </span>
        <span className="market-chip">
          <strong>ETH</strong>
          <small>LIVE</small>
        </span>
        <span className="market-chip">
          <strong>SOL</strong>
          <small>LIVE</small>
        </span>
      </div>
    </header>
  );
};

export default Header;
