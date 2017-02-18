import React from 'react';

const style = {
  navbarNav: {
    width: '100%',
    textAlign: 'center',
  },
  li: {
    float: 'none',
    display: 'inline-block',
  },
};

const InfoStatsBar = ({tab, handleTab}) => {
  const handleClick = (e) => {
    handleTab(e.target.textContent);
  };

  return (
    <nav className="card navbar navbar-dark stats-bar-gradient">
      <ul className="nav navbar-nav" style={style.navbarNav}>
        <li className={`nav-item ${tab === 'Info' && 'active'}`} style={style.li}>
          <a href="#2" className="nav-link" onClick={handleClick}>Info</a>
        </li>
        <li className={`nav-item ${tab === 'Running' && 'active'}`} style={style.li}>
          <a href="#2" className="nav-link" onClick={handleClick}>Running</a>
        </li>
        <li className={`nav-item ${tab === 'Cycling' && 'active'}`} style={style.li}>
          <a href="#2" className="nav-link" onClick={handleClick}>Cycling</a>
        </li>
        <li className={`nav-item ${tab === 'Walking' && 'active'}`} style={style.li}>
          <a href="#2" className="nav-link" onClick={handleClick}>Walking</a>
        </li>
        <li className={`nav-item ${tab === 'Routines' && 'active'}`} style={style.li}>
          <a href="#2" className="nav-link" onClick={handleClick}>Routines</a>
        </li>
      </ul>
    </nav>
  );
};

export default InfoStatsBar;
